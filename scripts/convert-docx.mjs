import mammoth from "mammoth";
import fs from "node:fs";
import path from "node:path";

const docxPath = path.resolve("seo-docs/Artiflex-IT-Business-Solutions-Website-Content.docx");
const outMd = path.resolve("seo-docs/Artiflex-IT-Business-Solutions-Website-Content.md");
const outHtml = path.resolve("seo-docs/Artiflex-IT-Business-Solutions-Website-Content.html");

const md = await mammoth.convertToMarkdown({ path: docxPath });
fs.writeFileSync(outMd, md.value, "utf8");

const html = await mammoth.convertToHtml({ path: docxPath });
fs.writeFileSync(outHtml, html.value, "utf8");

console.log("MD bytes:", md.value.length);
console.log("HTML bytes:", html.value.length);
if (md.messages?.length) console.log("MD messages:", md.messages.slice(0, 5));
