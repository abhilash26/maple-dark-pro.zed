// check_wcag_dark_theme.js

// -----------------------
// Hex ↔ RGB
// -----------------------
function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function rgbToHex({ r, g, b }) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// -----------------------
// Linear RGB & Luminance
// -----------------------
function srgbToLinear(value) {
    const s = value / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function getLuminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    const R = srgbToLinear(r);
    const G = srgbToLinear(g);
    const B = srgbToLinear(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// -----------------------
// Contrast Ratio
// -----------------------
function getContrast(hex1, hex2) {
    const L1 = getLuminance(hex1);
    const L2 = getLuminance(hex2);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}

// -----------------------
// WCAG Thresholds
// -----------------------
const WCAG = {
    AA_NORMAL: 4.5,
    AA_LARGE: 3.0,
    AAA_NORMAL: 7.0,
    AAA_LARGE: 4.5,
};

// -----------------------
// Evaluate a color against background
// -----------------------
function evaluateContrast(fgName, fgHex, bgHex) {
    const ratio = getContrast(fgHex, bgHex);
    const rounded = ratio.toFixed(2);
    return {
        fg: fgName,
        bg: bgHex,
        ratio: rounded,
        AA_NORMAL: ratio >= WCAG.AA_NORMAL,
        AA_LARGE: ratio >= WCAG.AA_LARGE,
        AAA_NORMAL: ratio >= WCAG.AAA_NORMAL,
        AAA_LARGE: ratio >= WCAG.AAA_LARGE,
    };
}

// -----------------------
// Auto-fix color for dark theme
// -----------------------
function adjustColorForContrast(fgHex, bgHex, minRatio = WCAG.AA_NORMAL) {
    let { r, g, b } = hexToRgb(fgHex);
    let factor = 1.05; // brighten step
    let newHex = fgHex;

    while (getContrast(newHex, bgHex) < minRatio) {
        r = Math.min(255, Math.floor(r * factor));
        g = Math.min(255, Math.floor(g * factor));
        b = Math.min(255, Math.floor(b * factor));
        newHex = rgbToHex({ r, g, b });
        factor += 0.05;
        if (factor > 3) break; // prevent infinite loop
    }

    return newHex;
}

// -----------------------
// Check all theme colors
// -----------------------
export function checkDarkTheme(themeColors) {
    const results = [];
    const fixedColors = {};

    const bgHex = themeColors.bg_dark;

    for (const [name, fgHex] of Object.entries(themeColors)) {
        if (name === "bg_dark") continue;

        const evalResult = evaluateContrast(name, fgHex, bgHex);
        results.push(evalResult);

        if (!evalResult.AA_NORMAL) {
            const newHex = adjustColorForContrast(fgHex, bgHex, WCAG.AA_NORMAL);
            fixedColors[name] = newHex;
        } else {
            fixedColors[name] = fgHex;
        }
    }

    return { results, fixedColors };
}
