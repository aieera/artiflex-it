import fs from "node:fs";
import path from "node:path";

const pagesDir = path.resolve("src/pages/Services/business-solutions/pages");

const configs = [
  { file: "CrmSoftware.tsx", name: "CRM Software", slug: "crm-software" },
  { file: "SalesManagementSoftware.tsx", name: "Sales Management Software", slug: "sales-management-software" },
  { file: "FinanceAccountingSoftware.tsx", name: "Finance & Accounting Software", slug: "finance-accounting-software" },
  { file: "HrManagementSoftware.tsx", name: "HR Management Software", slug: "hr-management-software" },
  { file: "DocumentManagementSystem.tsx", name: "Document Management System", slug: "document-management-system" },
  { file: "UnifiedFirewallManagement.tsx", name: "Unified Firewall Management", slug: "unified-firewall-management" },
];

for (const cfg of configs) {
  const full = path.join(pagesDir, cfg.file);
  let src = fs.readFileSync(full, "utf8");

  if (src.includes("breadcrumbSchema")) {
    console.log(`skip ${cfg.file} (already has breadcrumbSchema)`);
    continue;
  }

  const schemaBlock = `const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://artiflexit.com/" },
    { "@type": "ListItem", position: 2, name: "Business Solutions", item: "https://artiflexit.com/business-solutions" },
    { "@type": "ListItem", position: 3, name: "${cfg.name}", item: "https://artiflexit.com/business-solutions/${cfg.slug}" },
  ],
};
`;

  // Insert after the faqSchema declaration.
  const faqEnd = src.match(/const faqSchema = \{[\s\S]*?\};\n/);
  if (!faqEnd) throw new Error(`No faqSchema found in ${cfg.file}`);
  const insertAt = faqEnd.index + faqEnd[0].length;
  src = src.slice(0, insertAt) + "\n" + schemaBlock + src.slice(insertAt);

  // Add script tag in Helmet right after the faqSchema script.
  src = src.replace(
    /(<script type="application\/ld\+json">\{JSON\.stringify\(faqSchema\)\}<\/script>)/,
    `$1\n        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>`
  );

  fs.writeFileSync(full, src, "utf8");
  console.log(`patched ${cfg.file}`);
}
