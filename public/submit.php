<?php
/**
 * submit.php  —  Artiflex IP logger (client-side friendly)
 * ---------------------------------------------------------------------------
 * The website form calls this from the BROWSER. It logs the visitor's IP +
 * approximate location on your own server and returns them so the form can
 * also put them in the Web3Forms email.
 *
 * The form passes the visitor's IPv4 address as "client_ip" (fetched in the
 * browser) so the logged/returned IP matches the short IPv4 that Web3Forms
 * shows in its footer — instead of a long IPv6 the browser might connect with.
 * If no valid client_ip is supplied, we fall back to the raw connection IP.
 * ---------------------------------------------------------------------------
 */

const ENABLE_GEO_LOOKUP = true;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// ---- Read the form data first (may carry the browser-fetched IPv4) --------

$data = [];
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) $data = $decoded;
}

// ---- Where to store logs (above web root so re-deploys don't wipe it) ------

function resolve_log_dir(): string {
    $above = dirname(__DIR__) . '/artiflex-form-logs';
    if (@is_dir($above) || @mkdir($above, 0755, true) || @is_dir($above)) {
        if (@is_writable($above)) return $above;
    }
    $inside = __DIR__ . '/form-logs';
    if (!is_dir($inside)) @mkdir($inside, 0755, true);
    @file_put_contents($inside . '/.htaccess',
        "Require all denied\n<IfModule !mod_authz_core.c>\nOrder deny,allow\nDeny from all\n</IfModule>\n",
        LOCK_EX);
    @file_put_contents($inside . '/index.html', "", LOCK_EX);
    return $inside;
}

// ---- Raw connection IP (fallback) -----------------------------------------

function connection_ip(): string {
    $candidates = [];
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) $candidates[] = $_SERVER['HTTP_CF_CONNECTING_IP'];
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        foreach (explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']) as $p) $candidates[] = trim($p);
    }
    if (!empty($_SERVER['HTTP_X_REAL_IP'])) $candidates[] = $_SERVER['HTTP_X_REAL_IP'];
    $candidates[] = $_SERVER['REMOTE_ADDR'] ?? '';
    foreach ($candidates as $ip) {
        if (filter_var($ip, FILTER_VALIDATE_IP)) return $ip;
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Prefer the browser-supplied public IPv4 (or IPv6) if it's valid & public.
$ip = connection_ip();
$provided = is_string($data['client_ip'] ?? null) ? trim($data['client_ip']) : '';
if (filter_var($provided, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
    $ip = $provided;
}

$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$page_ref   = $_SERVER['HTTP_REFERER'] ?? '';
$now        = gmdate('Y-m-d\TH:i:s\Z');

// ---- Geo lookup (best effort) ---------------------------------------------

function geo_lookup(string $ip): array {
    if (!ENABLE_GEO_LOOKUP) return [];
    if (!filter_var($ip, FILTER_VALIDATE_IP)) return [];
    if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) return [];
    $url = 'http://ip-api.com/json/' . urlencode($ip)
         . '?fields=status,country,regionName,city,isp,org,mobile,proxy,hosting,query';
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 2, CURLOPT_CONNECTTIMEOUT => 2]);
        $resp = curl_exec($ch);
        curl_close($ch);
    } else {
        $ctx  = stream_context_create(['http' => ['timeout' => 2]]);
        $resp = @file_get_contents($url, false, $ctx);
    }
    if (!$resp) return [];
    $j = json_decode($resp, true);
    if (!is_array($j) || ($j['status'] ?? '') !== 'success') return [];
    return $j;
}

$geo = geo_lookup($ip);
$geo_str = $geo
    ? trim(($geo['city'] ?? '') . ', ' . ($geo['regionName'] ?? '') . ', ' . ($geo['country'] ?? '')
        . ' | ISP: ' . ($geo['isp'] ?? ''))
    : 'lookup unavailable';
$is_vpn = (bool)(($geo['proxy'] ?? false) || ($geo['hosting'] ?? false));

// ---- Log ------------------------------------------------------------------

$is_spam = !empty($data['botcheck']);

$log_row = [
    'time'       => $now,
    'ip'         => $ip,
    'geo'        => $geo_str,
    'vpn'        => $is_vpn ? 'YES' : 'no',
    'name'       => $data['name']    ?? '',
    'email'      => $data['email']   ?? '',
    'phone'      => $data['phone']   ?? '',
    'company'    => $data['company'] ?? '',
    'service'    => $data['service'] ?? '',
    'source'     => $data['submitted_from'] ?? ($data['source'] ?? ''),
    'spam'       => $is_spam ? 'YES' : 'no',
    'user_agent' => $user_agent,
    'referer'    => $page_ref,
    'message'    => str_replace(["\r", "\n"], ' ', (string)($data['message'] ?? '')),
];

@file_put_contents(
    resolve_log_dir() . '/submissions.log',
    json_encode($log_row, JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);

// ---- Return ---------------------------------------------------------------

echo json_encode([
    'success'  => true,
    'ip'       => $ip,
    'location' => $geo_str,
    'vpn'      => $is_vpn,
    'time'     => $now,
]);
