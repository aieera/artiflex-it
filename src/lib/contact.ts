/**
 * contact.ts
 * ---------------------------------------------------------------
 * Contact-form delivery (Web3Forms free plan — client-side).
 *
 * Delivery goes straight from the browser to Web3Forms (the free
 * plan requires this). To capture WHO submitted, we first try our
 * own /submit.php (which also writes the server log and detects
 * VPN/proxy). If that call is blocked/slow, we fall back to a public
 * IP+location lookup from the browser so the email's "Ip address"
 * and "Ip location" fields still get filled. Finally, if a VPN or
 * datacenter IP is detected, the subject line is flagged.
 * ---------------------------------------------------------------
 */

export const WEB3FORMS_ACCESS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "REPLACE_WITH_WEB3FORMS_ACCESS_KEY";

/** Inbox that Web3Forms is configured to deliver submissions to. */
export const CONTACT_EMAIL = "info@artiflexit.com";

/** Web3Forms endpoint — submitted directly from the browser (free-plan OK). */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Our own IP-logging endpoint (same origin). Set "" to disable. */
export const IP_LOG_ENDPOINT: string =
  import.meta.env.VITE_IP_LOG_ENDPOINT ?? "/submit.php";

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  employees?: string;
  service?: string;
  message: string;
  source: string;
  botcheck?: string;
}

interface IpInfo {
  ip?: string;
  location?: string;
  vpn?: boolean;
}

/** fetch with a timeout so a slow/blocked call fails soft. */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  ms = 4000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Get the visitor's public IPv4 address from the browser, so the logged /
 *  emailed IP matches the short IPv4 Web3Forms shows (not a long IPv6 the
 *  browser may connect with). Returns "" if it can't be fetched. */
async function getIpv4(): Promise<string> {
  try {
    const res = await fetchWithTimeout("https://api4.ipify.org?format=json", {}, 4000);
    if (res.ok) {
      const j = (await res.json()) as { ip?: string };
      if (j && j.ip) return j.ip;
    }
  } catch {
    /* ignore */
  }
  return "";
}

/** Primary: our own /submit.php — returns IP + location + VPN flag, and logs
 *  the submission on the server. Retries once. Returns null if unreachable. */
async function logAndGetIp(data: ContactSubmission, clientIp: string): Promise<IpInfo | null> {
  if (!IP_LOG_ENDPOINT) return null;

  const body = JSON.stringify({
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    company: data.company || "",
    service: data.service || "",
    message: data.message,
    submitted_from: data.source,
    botcheck: data.botcheck || "",
    client_ip: clientIp, // browser-fetched IPv4, used server-side for geo + log
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchWithTimeout(IP_LOG_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body,
      });
      if (!res.ok) continue;
      const j = (await res.json()) as IpInfo;
      if (j && j.ip) return j;
    } catch {
      /* retry */
    }
  }
  return null;
}

/** Fallback: look up location for the given IPv4 from a public HTTPS service,
 *  used only if our own endpoint could not be reached. */
async function publicIpInfo(clientIp: string): Promise<IpInfo | null> {
  if (!clientIp) return null;
  // ipwho.is supports a per-IP lookup and includes a VPN/proxy flag.
  try {
    const res = await fetchWithTimeout(`https://ipwho.is/${clientIp}`, {}, 4000);
    if (res.ok) {
      const j = (await res.json()) as any;
      if (j && j.success !== false && j.ip) {
        const isp = j.connection?.isp || j.connection?.org || "";
        const loc = [j.city, j.region, j.country].filter(Boolean).join(", ");
        const vpn = Boolean(j.security?.proxy || j.security?.vpn || j.security?.hosting);
        return {
          ip: j.ip,
          location: isp ? `${loc} | ISP: ${isp}` : loc,
          vpn,
        };
      }
    }
  } catch {
    /* give up */
  }
  // Last resort: at least show the IPv4, without location.
  return { ip: clientIp, location: "", vpn: false };
}

/**
 * Send a contact submission.
 * Returns { ok: true } on success, otherwise { ok: false, error }.
 * Never throws.
 */
export async function submitContactForm(
  data: ContactSubmission
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Honeypot caught a bot: pretend success, send nothing.
  if (data.botcheck) {
    return { ok: true };
  }

  if (WEB3FORMS_ACCESS_KEY === "REPLACE_WITH_WEB3FORMS_ACCESS_KEY") {
    // eslint-disable-next-line no-console
    console.warn(
      "[contact] Web3Forms access key is not set. " +
        "Set VITE_WEB3FORMS_ACCESS_KEY (or edit src/lib/contact.ts) to enable real delivery."
    );
    return {
      ok: false,
      error: "Form is not configured yet. Please email us directly at " + CONTACT_EMAIL + ".",
    };
  }

  // Step 1: capture the visitor's IPv4 + location. First fetch the public
  // IPv4 in the browser (so it matches Web3Forms' footer IP), then ask our
  // own endpoint to geo-locate + log it (also detects VPN). If our endpoint
  // is blocked, fall back to a public location lookup for that same IPv4.
  const clientIp = await getIpv4();
  let ipInfo = await logAndGetIp(data, clientIp);
  if (!ipInfo?.ip) {
    ipInfo = await publicIpInfo(clientIp);
  }

  const ip = ipInfo?.ip || clientIp || "not available";
  const location = ipInfo?.location || "not available";
  const isVpn = Boolean(ipInfo?.vpn);

  // Step 2: build the Web3Forms payload with filled IP fields.
  const payload: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    // VPN/datacenter submissions get a subject flag so they stand out in the inbox.
    subject:
      (isVpn ? "⚠️ [VPN] " : "") +
      `New Inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    from_name: data.name,
    name: data.name,
    email: data.email,
    phone: data.phone || "Not provided",
    company: data.company || "Not provided",
    employees: data.employees || "Not specified",
    service: data.service || "Not specified",
    message: data.message,
    submitted_from: data.source,
    ip_address: ip,
    ip_location: isVpn ? `${location} (VPN / proxy detected)` : location,
  };

  // Step 3: deliver via Web3Forms, directly from the browser (free-plan OK).
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = (await res.json()) as { success?: boolean; message?: string };

    if (res.ok && json.success) {
      return { ok: true };
    }
    return {
      ok: false,
      error:
        json.message ||
        "Something went wrong sending your message. Please try again or email us directly.",
    };
  } catch {
    return {
      ok: false,
      error:
        "Network error, your message could not be sent. Please check your connection or email us directly.",
    };
  }
}
