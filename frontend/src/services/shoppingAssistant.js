import { products } from "../data/products.js";

const normalize = (value) =>
    value
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/[^a-z0-9₹]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");

const aliases = new Map([
    [1, ["parle g", "parle-g"]],
    [2, ["good day"]],
    [3, ["marie gold"]],
    [4, ["oreo"]],
    [5, ["hide and seek"]],
    [6, ["bourbon"]],
    [7, ["monaco"]],
    [8, ["krackjack"]],
    [9, ["lays", "chips"]],
    [10, ["kurkure"]],
    [11, ["namkeen", "bhujia"]],
    [12, ["maggi"]],
    [13, ["yippee"]],
    [14, ["popcorn"]],
    [15, ["peanuts"]],
    [16, ["dairy milk"]],
    [17, ["kitkat"]],
    [18, ["5 star"]],
    [19, ["munch"]],
    [20, ["perk"]],
    [21, ["eclairs"]],
    [22, ["pulse"]],
    [23, ["amul milk"]],
    [24, ["thums up"]],
    [25, ["sprite"]],
    [26, ["coca cola", "coke"]],
    [27, ["frooti"]],
    [28, ["fruit juice", "juice"]],
    [29, ["water"]],
    [30, ["buttermilk", "chaas"]],
    [57, ["tata tea", "tea"]],
]);

const productAliases = products
    .map((product) => {
        const baseName = product.name
            .replace(/\s+(?:biscuits|chocolate|pack|bottle)$/i, "");
        const terms = [baseName, ...(aliases.get(product.id) || [])]
            .map(normalize)
            .filter(Boolean);

        return { product, terms: [...new Set(terms)] };
    })
    .sort((left, right) => {
        const leftLength = Math.max(...left.terms.map((term) => term.length));
        const rightLength = Math.max(...right.terms.map((term) => term.length));
        return rightLength - leftLength;
    });

const comboSets = {
    tea: {
        name: "Tea-time favourites",
        items: [[1, 1], [2, 1], [57, 1]],
    },
    movie: {
        name: "Movie night snacks",
        items: [[14, 1], [9, 1], [26, 1], [17, 1]],
    },
    party: {
        name: "Kids party treats",
        items: [[27, 1], [14, 1], [16, 1], [21, 1]],
    },
    sweetSalty: {
        name: "Sweet & salty combo",
        items: [[2, 1], [11, 1], [25, 1]],
    },
};

const findBudget = (text) => {
    const match = text.match(/(?:under|below|within|budget(?: of)?|₹|rs\.?)\s*₹?\s*(\d+)/i);
    return match ? Number(match[1]) : null;
};

const getCombo = (text) => {
    if (/movie|film|cinema/i.test(text)) return comboSets.movie;
    if (/kids?\s*(?:party|birthday)|birthday\s*party/i.test(text)) return comboSets.party;
    if (/sweet\s*(?:and|&|\+)\s*salty|sweet salty/i.test(text)) return comboSets.sweetSalty;
    if (/tea[\s-]*time|chai|tea combo/i.test(text)) return comboSets.tea;
    return null;
};

const applyBudget = (items, budget) => {
    if (budget === null) return items;

    let remaining = budget;
    return items.filter(({ product, quantity }) => {
        const itemTotal = product.price * quantity;
        if (itemTotal > remaining) return false;
        remaining -= itemTotal;
        return true;
    });
};

const matchProducts = (text) => {
    const normalized = normalize(text);
    const candidates = [];

    for (const entry of productAliases) {
        for (const term of entry.terms) {
            const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
            const match = new RegExp(`(?:^|\\s)${escaped}(?=\\s|$)`).exec(normalized);
            if (match) {
                const start = match.index + (match[0].startsWith(" ") ? 1 : 0);
                candidates.push({ product: entry.product, start, end: start + term.length });
                break;
            }
        }
    }

    candidates.sort((left, right) =>
        left.start - right.start || (right.end - right.start) - (left.end - left.start)
    );

    const selected = [];
    for (const candidate of candidates) {
        if (selected.some((item) => candidate.start < item.end && candidate.end > item.start)) {
            continue;
        }

        const prefix = normalized.slice(0, candidate.start);
        const quantityMatch = prefix.match(/(\d+)\s*(?:x|×)?\s*$/);
        const quantity = quantityMatch ? Math.min(Number(quantityMatch[1]), 20) : 1;
        selected.push({ ...candidate, quantity });
    }

    return selected.map(({ product, quantity }) => ({ product, quantity }));
};

export const findRecommendations = (items) => {
    const categories = new Set(items.map(({ product }) => product.category));
    const excludedIds = new Set(items.map(({ product }) => product.id));
    let category = "Drinks";

    if (categories.has("Biscuits") || categories.has("Daily Essentials")) {
        category = "Drinks";
    } else if (categories.has("Snacks")) {
        category = "Drinks";
    } else if (categories.has("Chocolate")) {
        category = "Snacks";
    } else {
        category = "Snacks";
    }

    return products
        .filter((product) => product.category === category && !excludedIds.has(product.id))
        .slice(0, 3)
        .map((product) => ({ product, quantity: 1 }));
};

const getCategoryMatches = (text, budget) => {
    const normalized = normalize(text);
    const category = normalized.includes("biscuit")
        ? "Biscuits"
        : normalized.includes("chocolate") || normalized.includes("sweet")
            ? "Chocolate"
            : normalized.includes("drink") || normalized.includes("beverage")
                ? "Drinks"
                : normalized.includes("essential") || normalized.includes("household")
                    ? "Daily Essentials"
                    : "Snacks";

    const categoryItems = products
        .filter((product) => product.category === category)
        .sort((left, right) => left.price - right.price)
        .map((product) => ({ product, quantity: 1 }));

    return applyBudget(categoryItems, budget).slice(0, 5);
};

export function buildShoppingResponse(input) {
    const text = input.trim();
    const normalized = normalize(text);
    const budget = findBudget(text);
    const combo = getCombo(text);

    if (/best sellers|bestsellers|popular/i.test(normalized)) {
        const items = [[1, 1], [2, 1], [9, 1], [11, 1], [16, 1]]
            .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }));

        return {
            text: "Here are some Tara favourites customers reach for often:",
            items,
            recommendations: findRecommendations(items),
            actionLabel: "Add All to Cart",
        };
    }

    if (combo) {
        const items = combo.items
            .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
            .filter(({ product }) => product);
        const budgetedItems = applyBudget(items, budget);

        return {
            text: budgetedItems.length
                ? `To make ${combo.name.toLowerCase()} great, take these items together:`
                : `That combo is above your ₹${budget} budget. Try one of these lighter picks:`,
            items: budgetedItems.length ? budgetedItems : getCategoryMatches("snacks", budget),
            recommendations: [],
            actionLabel: "Add Full Combo to Cart",
        };
    }

    let items = matchProducts(text);
    if (!items.length && /\b(?:snacks?|biscuits?|chocolates?|drinks?|beverages?|essentials?)\b/i.test(normalized)) {
        items = getCategoryMatches(text, budget);
    } else {
        items = applyBudget(items, budget);
    }

    if (!items.length) {
        return {
            text: "I couldn't find an exact catalog match. Try a product name, category, budget, or one of the occasion ideas below.",
            items: [],
            recommendations: [],
            actionLabel: "Add All to Cart",
        };
    }

    return {
        text: budget !== null && items.length < matchProducts(text).length
            ? `These catalog matches fit within your ₹${budget} budget:`
            : "Here are the matching items from the Tara catalog:",
        items,
        recommendations: findRecommendations(items),
        actionLabel: "Add All to Cart",
    };
}
