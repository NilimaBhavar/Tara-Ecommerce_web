import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { products } from "../src/data/products.js";

const outputDirectory = fileURLToPath(
    new URL("../public/images/products/", import.meta.url)
);

const brandPalettes = {
    "parle-g": ["#ffd52a", "#d82724", "#fff4b1"],
    "good-day": ["#bb231c", "#e7ae3c", "#fff1bd"],
    "marie-gold": ["#f47b20", "#c8271d", "#ffe29a"],
    oreo: ["#153b7a", "#13224c", "#dce9ff"],
    "hide-and-seek": ["#472b24", "#d19a4a", "#fff0ce"],
    bourbon: ["#322132", "#b63a39", "#f6d8b8"],
    monaco: ["#e6b12d", "#c03925", "#fff0b5"],
    lays: ["#f1c52b", "#d82c24", "#fff1b1"],
    kurkure: ["#f58b1f", "#d53324", "#ffe3a2"],
    maggi: ["#f4c51d", "#c72222", "#fff1a7"],
    yippee: ["#e6332b", "#f4b52f", "#fff0b0"],
    "dairy-milk": ["#4c2678", "#302051", "#ead2ff"],
    kitkat: ["#bd1e28", "#771d25", "#ffe2aa"],
    "5-star": ["#482337", "#d19b35", "#ffe8a6"],
    munch: ["#d94c1e", "#8d2523", "#ffe2a0"],
    perk: ["#2872ac", "#c52c3b", "#fff1ba"],
    "coca-cola": ["#cf202e", "#8b1724", "#ffe0d7"],
    "thums-up": ["#17191f", "#be2735", "#f2cd72"],
    sprite: ["#26984f", "#d4d638", "#efffae"],
    frooti: ["#f3c62d", "#e78319", "#fff0a0"],
    "tata-salt": ["#1669a5", "#e9f1fb", "#f8d75a"],
    "tata-tea": ["#762a28", "#d39a43", "#f8e1ae"],
    "surf-excel-detergent": ["#1a4c99", "#e44838", "#fff2c2"],
    "nirma-washing-powder": ["#23599b", "#f4d84b", "#fff8d5"],
    "amul-milk": ["#1e59a4", "#e8f4ff", "#ec3d36"],
    "parachute-hair-oil": ["#2873b7", "#e7f2ef", "#a9d77c"],
    "colgate-toothpaste": ["#df2637", "#f4f1ed", "#81cbe0"],
    "lifebuoy-soap": ["#d82930", "#fff4ea", "#f0d653"],
};

const categoryHues = {
    Biscuits: 42,
    Snacks: 22,
    Chocolate: 328,
    Drinks: 205,
    "Personal Care": 174,
    Household: 145,
    "Daily Essentials": 51,
};

const categoryPalette = (category, index) => {
    const hue = (categoryHues[category] + index * 31) % 360;
    return [
        `hsl(${hue} 76% 46%)`,
        `hsl(${(hue + 22) % 360} 70% 29%)`,
        `hsl(${(hue + 47) % 360} 86% 79%)`,
    ];
};

const escapeXml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const productLines = (name) => {
    const words = name.split(/\s+/);
    if (name.length <= 18) return [name];

    const lines = [];
    let line = "";
    for (const word of words) {
        if (`${line} ${word}`.trim().length > 17 && line) {
            lines.push(line);
            line = word;
        } else {
            line = `${line} ${word}`.trim();
        }
    }
    if (line) lines.push(line);
    return lines.slice(0, 3);
};

const productIllustration = (product, index) => {
    const slug = product.slug;
    const [main, dark, accent] =
        brandPalettes[slug] || categoryPalette(product.category, index);
    const lines = productLines(product.name);
    const labelStart = lines.length === 1
        ? 210
        : lines.length === 2
            ? 195
            : 184;
    const title = lines.map((line, lineIndex) =>
        `<text x="200" y="${labelStart + lineIndex * 25}" text-anchor="middle" class="name">${escapeXml(line)}</text>`
    ).join("\n");
    const packageShape = product.category === "Drinks"
        ? `<path d="M147 70h106v269q0 17-17 17h-72q-17 0-17-17z" fill="url(#pack)" stroke="#fff" stroke-opacity=".3" stroke-width="3"/><rect x="174" y="52" width="52" height="22" rx="6" fill="${accent}"/><path d="M147 100h106v30H147z" fill="${accent}" opacity=".92"/>`
        : product.category === "Personal Care"
            ? `<path d="M165 92h70l7 31v20q18 5 18 26v145q0 18-18 18h-84q-18 0-18-18V169q0-21 18-26v-20z" fill="url(#pack)" stroke="#fff" stroke-opacity=".3" stroke-width="3"/><rect x="177" y="68" width="46" height="27" rx="7" fill="${accent}"/>`
            : `<path d="M108 116q0-14 15-14h154q15 0 15 14v221q0 15-15 15H123q-15 0-15-15z" fill="url(#pack)" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>`;
    const centerY = product.category === "Drinks" ? 202 : 213;
    const motif = index % 3 === 0
        ? `<circle cx="200" cy="275" r="32" fill="${accent}" opacity=".2"/><circle cx="200" cy="275" r="22" fill="none" stroke="${accent}" stroke-width="3" opacity=".8"/>`
        : index % 3 === 1
            ? `<path d="M145 274h110" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity=".9"/><path d="M160 291h80" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity=".65"/>`
            : `<path d="M172 266l14-17 14 17 14-17 14 17" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    const category = product.category.toUpperCase();

    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="440" viewBox="0 0 400 440" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(product.name)} illustrated pack</title>
  <desc id="description">Original vector product-pack illustration for ${escapeXml(product.name)}. Add a real product photo beside this SVG as ${slug}.jpg or ${slug}.png to use it instead.</desc>
  <defs>
    <linearGradient id="pack" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${main}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
    <linearGradient id="shine" x1="0" x2="1"><stop stop-color="#fff" stop-opacity=".24"/><stop offset=".45" stop-color="#fff" stop-opacity=".02"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient>
    <filter id="shadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#080611" flood-opacity=".35"/></filter>
  </defs>
  <ellipse cx="200" cy="386" rx="112" ry="15" fill="#060510" opacity=".28"/>
  <g filter="url(#shadow)" transform="rotate(${index % 2 ? 2 : -2} 200 225)">
    ${packageShape}
    <path d="M124 119h29v205h-29z" fill="url(#shine)" opacity=".8"/>
    <path d="M266 118h17v214h-17z" fill="#fff" opacity=".07"/>
    <rect x="117" y="${centerY - 55}" width="166" height="131" rx="12" fill="${dark}" opacity=".88" stroke="${accent}" stroke-opacity=".65" stroke-width="2"/>
    <text x="200" y="${centerY - 38}" text-anchor="middle" class="brand">TARA DAILY</text>
    ${title}
    ${motif}
    <text x="200" y="321" text-anchor="middle" class="category">${escapeXml(category)}</text>
    <path d="M128 342h144" stroke="${accent}" stroke-width="3" opacity=".7"/>
    <text x="200" y="361" text-anchor="middle" class="detail">EVERYDAY FAVOURITE</text>
  </g>
  <style>
    text{font-family:Arial,Helvetica,sans-serif}
    .brand{fill:${accent};font-size:11px;font-weight:700;letter-spacing:3px}
    .name{fill:#fff;font-size:${lines.some((line) => line.length > 14) ? 17 : 20}px;font-weight:700;letter-spacing:.1px}
    .category{fill:${accent};font-size:10px;font-weight:700;letter-spacing:2px}
    .detail{fill:#fff;fill-opacity:.75;font-size:8px;font-weight:600;letter-spacing:1.7px}
  </style>
</svg>`;
};

await mkdir(outputDirectory, { recursive: true });

for (const [index, product] of products.entries()) {
    await writeFile(
        path.join(outputDirectory, `${product.slug}.svg`),
        productIllustration(product, index),
        "utf8"
    );
}

console.log(`Generated ${products.length} original product illustrations in ${outputDirectory}`);
