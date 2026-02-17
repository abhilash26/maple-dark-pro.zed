const fs = require("fs");

// =============================
// Load Config
// =============================
const metadata = require("./data/metadata.json");
const palette = require("./data/palette.json");
const theme = require("./data/theme.json");
const { checkDarkTheme } = require("./check_wcag");
const { getStyle } = require("./replace_style");

// =============================
// Theme Builder
// =============================
function createTheme(m, t, p) {
    return {
        name: m.colorscheme,
        author: m.author,
        $schema: m.schema,
        themes: [
            {
                appearance: m.type,
                name: m.colorscheme,
                style: getStyle(t, p),
            },
        ],
        description: m.colorscheme,
        isUserGenerated: m.usergenerated,
    };
}

function generateToml(json) {
    const toml = `
id = "${json.name}"
name = "${json.colorscheme}"
version = "${json.version}"
schema_version = ${json.schema_version}
authors = ["${json.author}"]
description = "${json.description}"
repository = "${json.repository}"
  `.trim();
    return toml;
}

// =============================
// Main Execution
// =============================
// -----------------------
// Run Checker
// -----------------------
const { results, fixedColors } = checkDarkTheme(palette);

console.log("Original Evaluation:");
console.table(results);

console.log("Suggested WCAG-compliant Colors:");
console.table(fixedColors);

const colorscheme = createTheme(metadata, theme, palette);
const colorschemeFileName = `./themes/${metadata.name}.json`;
const tomlFileName = `./themes/extension.toml`;

fs.writeFileSync(colorschemeFileName, JSON.stringify(colorscheme, null, 2));
fs.writeFileSync(tomlFileName, generateToml(metadata));
console.log(`✅ Theme generated: ${colorschemeFileName}`);
console.log(`✅ Metadata generated: ${tomlFileName}`);
