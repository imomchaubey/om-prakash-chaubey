import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function readFileSafe(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, "utf8");
}

function parseEnvFile(content) {
  const result = {};
  if (!content) return result;
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    result[key] = val;
  }
  return result;
}

const dataFiles = [
  "src/data/profile.ts",
  "src/data/skills.ts",
  "src/data/projects.ts",
  "src/data/education.ts",
  "src/data/site.ts",
];

const todoRegex = /TODO\([^)]+\)/g;
const allDataTodos = [];

for (const relPath of dataFiles) {
  const content = readFileSafe(relPath);
  if (!content) continue;
  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    const matches = line.match(todoRegex);
    if (matches) {
      for (const match of matches) {
        allDataTodos.push({
          file: relPath,
          line: idx + 1,
          todo: match,
        });
      }
    }
  });
}

// Check launch-required items:
// 1. About bio in src/data/profile.ts
// 2. Public CV (phone-free replacement; currently identical to _inputs/resume1.pdf or ignored in .gitignore)
// 3. Formspree ID in .env.local or process.env.NEXT_PUBLIC_FORMSPREE_ID

const requiredLaunchBlockers = [];

const profileContent = readFileSafe("src/data/profile.ts") || "";
if (profileContent.includes("TODO(about bio")) {
  requiredLaunchBlockers.push({
    key: "aboutBio",
    reason: "src/data/profile.ts still has TODO(about bio, 3–4 sentences from Om)",
  });
}

const gitignoreContent = readFileSafe(".gitignore") || "";
const inputResumePath = path.join(rootDir, "_inputs", "resume1.pdf");
const publicResumePath = path.join(rootDir, "public", "Om_Prakash_Chaubey_Resume.pdf");

if (!fs.existsSync(publicResumePath)) {
  requiredLaunchBlockers.push({
    key: "publicCV",
    reason: "public/Om_Prakash_Chaubey_Resume.pdf is missing",
  });
} else if (
  fs.existsSync(inputResumePath) &&
  fs.readFileSync(inputResumePath).equals(fs.readFileSync(publicResumePath))
) {
  requiredLaunchBlockers.push({
    key: "publicCV",
    reason:
      "PUBLIC CV CONTAINS PHONE NUMBER — public/Om_Prakash_Chaubey_Resume.pdf is still identical to _inputs/resume1.pdf (and ignored in .gitignore)",
  });
} else if (gitignoreContent.includes("public/Om_Prakash_Chaubey_Resume.pdf")) {
  requiredLaunchBlockers.push({
    key: "publicCV",
    reason:
      "public/Om_Prakash_Chaubey_Resume.pdf is still listed in .gitignore; remove the ignore rule after replacing with a phone-free CV",
  });
}

const envLocal = parseEnvFile(readFileSafe(".env.local"));
const formspreeId = (
  process.env.NEXT_PUBLIC_FORMSPREE_ID ||
  envLocal.NEXT_PUBLIC_FORMSPREE_ID ||
  ""
).trim();

if (!formspreeId || formspreeId.startsWith("TODO")) {
  requiredLaunchBlockers.push({
    key: "formspreeId",
    reason: "NEXT_PUBLIC_FORMSPREE_ID is not set in .env.local or environment",
  });
}

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  envLocal.NEXT_PUBLIC_SITE_URL ||
  ""
).trim();

if (
  !siteUrl ||
  siteUrl.startsWith("TODO") ||
  siteUrl.includes("localhost") ||
  siteUrl.includes("127.0.0.1")
) {
  requiredLaunchBlockers.push({
    key: "siteUrl",
    reason:
      "NEXT_PUBLIC_SITE_URL is unset or still points to localhost (must be production HTTPS URL before launch)",
  });
}

console.log("=== PORTFOLIO TODO & LAUNCH CHECK ===");
console.log(`\n1. REQUIRED FOR LAUNCH (${requiredLaunchBlockers.length} unresolved):`);
if (requiredLaunchBlockers.length === 0) {
  console.log(
    "   [PASS] All launch-required items (bio, public CV, Formspree ID, NEXT_PUBLIC_SITE_URL) are resolved."
  );
} else {
  for (const blocker of requiredLaunchBlockers) {
    console.log(`   [BLOCKING - ${blocker.key}] ${blocker.reason}`);
  }
}

console.log(`\n2. ALL DATA FILE TODOs (${allDataTodos.length} found):`);
for (const item of allDataTodos) {
  console.log(`   - ${item.file}:${item.line} -> ${item.todo}`);
}

if (requiredLaunchBlockers.length > 0) {
  console.error(
    `\nResult: FAILED (${requiredLaunchBlockers.length} launch-required item(s) unresolved). Exiting with code 1.`
  );
  process.exit(1);
}

console.log("\nResult: PASSED (all launch-required items resolved).");
