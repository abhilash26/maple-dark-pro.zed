// Helper: convert hex to RGB array [r,g,b]
function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((c) => c + c)
            .join("");
    } else if (hex.length === 8) {
        hex = hex.slice(0, 6); // ignore alpha for matching
    }
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Helper: Euclidean distance in RGB space
function colorDistance(rgb1, rgb2) {
    return Math.sqrt(
        (rgb1[0] - rgb2[0]) ** 2 + (rgb1[1] - rgb2[1]) ** 2 + (rgb1[2] - rgb2[2]) ** 2,
    );
}

// Recursively replace colors with closest palette color
function replaceColors(obj, paletteColors, cache = new Map()) {
    const newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        const val = obj[key];
        if (typeof val === "string" && /^#([0-9a-fA-F]{3,8})$/.test(val)) {
            if (cache.has(val)) {
                newObj[key] = cache.get(val);
                continue;
            }
            const alpha = val.length === 9 ? val.slice(7) : "";
            const rgb = hexToRgb(val);

            // Find closest palette color
            let closest = paletteColors[0];
            let minDist = colorDistance(rgb, hexToRgb(closest));
            for (const pc of paletteColors) {
                const dist = colorDistance(rgb, hexToRgb(pc));
                if (dist < minDist) {
                    minDist = dist;
                    closest = pc;
                }
            }

            const replaced = closest + alpha;
            cache.set(val, replaced);
            newObj[key] = replaced;
        } else if (typeof val === "object" && val !== null) {
            newObj[key] = replaceColors(val, paletteColors, cache);
        } else {
            newObj[key] = val;
        }
    }
    return newObj;
}

// Main function
function getStyle(theme, palette) {
    const paletteColors = Object.values(palette);
    return replaceColors(theme, paletteColors);
}

// Export for CommonJS
module.exports = { getStyle };
