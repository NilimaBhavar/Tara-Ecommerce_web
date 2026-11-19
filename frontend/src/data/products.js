
const catalogProducts = [
    // Snacks & Biscuits
    { id: 1, name: "Parle-G Biscuits", category: "Biscuits", price: 10, image: "/images/Parle_G.webp" },
    { id: 2, name: "Good Day Biscuits", category: "Biscuits", price: 30, image: "https://placehold.co/400x300?text=Good+Day" },
    { id: 3, name: "Marie Gold Biscuits", category: "Biscuits", price: 30, image: "https://placehold.co/400x300?text=Marie+Gold" },
    { id: 4, name: "Oreo Biscuits", category: "Biscuits", price: 20, image: "https://placehold.co/400x300?text=Oreo" },
    { id: 5, name: "Hide and Seek Biscuits", category: "Biscuits", price: 35, image: "https://placehold.co/400x300?text=Hide+and+Seek" },
    { id: 6, name: "Bourbon Biscuits", category: "Biscuits", price: 30, image: "https://placehold.co/400x300?text=Bourbon" },
    { id: 7, name: "Monaco Biscuits", category: "Biscuits", price: 20, image: "https://placehold.co/400x300?text=Monaco" },
    { id: 8, name: "KrackJack Biscuits", category: "Biscuits", price: 20, image: "https://placehold.co/400x300?text=KrackJack" },
    { id: 9, name: "Lay's Classic Chips", category: "Snacks", price: 20, image: "https://placehold.co/400x300?text=Lays+Chips" },
    { id: 10, name: "Kurkure Masala Munch", category: "Snacks", price: 20, image: "https://placehold.co/400x300?text=Kurkure" },
    { id: 11, name: "Haldiram Aloo Bhujia", category: "Snacks", price: 50, image: "https://placehold.co/400x300?text=Aloo+Bhujia" },
    { id: 12, name: "Maggi Noodles", category: "Snacks", price: 15, image: "https://placehold.co/400x300?text=Maggi" },
    { id: 13, name: "Yippee Noodles", category: "Snacks", price: 15, image: "https://placehold.co/400x300?text=Yippee" },
    { id: 14, name: "Popcorn Pack", category: "Snacks", price: 30, image: "https://placehold.co/400x300?text=Popcorn" },
    { id: 15, name: "Roasted Peanuts", category: "Snacks", price: 25, image: "https://placehold.co/400x300?text=Peanuts" },

    // Chocolates & Candy
    { id: 16, name: "Cadbury Dairy Milk", category: "Chocolate", price: 50, image: "https://placehold.co/400x300?text=Dairy+Milk" },
    { id: 17, name: "KitKat Chocolate", category: "Chocolate", price: 25, image: "https://placehold.co/400x300?text=KitKat" },
    { id: 18, name: "5 Star Chocolate", category: "Chocolate", price: 20, image: "https://placehold.co/400x300?text=5+Star" },
    { id: 19, name: "Munch Chocolate", category: "Chocolate", price: 10, image: "https://placehold.co/400x300?text=Munch" },
    { id: 20, name: "Perk Chocolate", category: "Chocolate", price: 10, image: "https://placehold.co/400x300?text=Perk" },
    { id: 21, name: "Eclairs Candy Pack", category: "Chocolate", price: 20, image: "https://placehold.co/400x300?text=Eclairs" },
    { id: 22, name: "Pulse Candy Pack", category: "Chocolate", price: 10, image: "https://placehold.co/400x300?text=Pulse" },

    // Drinks & Dairy
    { id: 23, name: "Amul Milk", category: "Drinks", price: 32, image: "https://placehold.co/400x300?text=Amul+Milk" },
    { id: 24, name: "Thums Up", category: "Drinks", price: 40, image: "https://placehold.co/400x300?text=Thums+Up" },
    { id: 25, name: "Sprite Bottle", category: "Drinks", price: 45, image: "https://placehold.co/400x300?text=Sprite" },
    { id: 26, name: "Coca-Cola", category: "Drinks", price: 40, image: "https://placehold.co/400x300?text=Coca-Cola" },
    { id: 27, name: "Frooti Mango Drink", category: "Drinks", price: 20, image: "https://placehold.co/400x300?text=Frooti" },
    { id: 28, name: "Real Fruit Juice", category: "Drinks", price: 40, image: "https://placehold.co/400x300?text=Fruit+Juice" },
    { id: 29, name: "Packaged Drinking Water", category: "Drinks", price: 20, image: "https://placehold.co/400x300?text=Water" },
    { id: 30, name: "Amul Buttermilk", category: "Drinks", price: 15, image: "https://placehold.co/400x300?text=Buttermilk" },

    // Personal Care
    { id: 31, name: "Colgate Toothpaste", category: "Personal Care", price: 55, image: "https://placehold.co/400x300?text=Colgate" },
    { id: 32, name: "Lux Soap", category: "Personal Care", price: 40, image: "https://placehold.co/400x300?text=Lux+Soap" },
    { id: 33, name: "Lifebuoy Soap", category: "Personal Care", price: 35, image: "https://placehold.co/400x300?text=Lifebuoy" },
    { id: 34, name: "Clinic Plus Shampoo", category: "Personal Care", price: 120, image: "https://placehold.co/400x300?text=Clinic+Plus" },
    { id: 35, name: "Parachute Hair Oil", category: "Personal Care", price: 90, image: "https://placehold.co/400x300?text=Parachute+Oil" },
    { id: 36, name: "Pears Soap", category: "Personal Care", price: 50, image: "https://placehold.co/400x300?text=Pears" },
    { id: 37, name: "Dove Soap", category: "Personal Care", price: 55, image: "https://placehold.co/400x300?text=Dove" },
    { id: 38, name: "Nivea Lip Balm", category: "Personal Care", price: 110, image: "https://placehold.co/400x300?text=Lip+Balm" },
    { id: 39, name: "Face Wash", category: "Personal Care", price: 99, image: "https://placehold.co/400x300?text=Face+Wash" },
    { id: 40, name: "Hair Comb", category: "Personal Care", price: 25, image: "https://placehold.co/400x300?text=Comb" },
    { id: 41, name: "Toothbrush", category: "Personal Care", price: 30, image: "https://placehold.co/400x300?text=Toothbrush" },
    { id: 42, name: "Small Hand Sanitizer", category: "Personal Care", price: 40, image: "https://placehold.co/400x300?text=Sanitizer" },

    // Household & Cleaning
    { id: 43, name: "Vim Dishwash Bar", category: "Household", price: 20, image: "https://placehold.co/400x300?text=Vim+Bar" },
    { id: 44, name: "Vim Dishwash Liquid", category: "Household", price: 99, image: "https://placehold.co/400x300?text=Vim+Liquid" },
    { id: 45, name: "Surf Excel Detergent", category: "Household", price: 50, image: "https://placehold.co/400x300?text=Surf+Excel" },
    { id: 46, name: "Nirma Washing Powder", category: "Household", price: 35, image: "https://placehold.co/400x300?text=Nirma" },
    { id: 47, name: "Lizol Floor Cleaner", category: "Household", price: 120, image: "https://placehold.co/400x300?text=Lizol" },
    { id: 48, name: "Scrub Pad", category: "Household", price: 15, image: "https://placehold.co/400x300?text=Scrub+Pad" },
    { id: 49, name: "Garbage Bags", category: "Household", price: 60, image: "https://placehold.co/400x300?text=Garbage+Bags" },
    { id: 50, name: "Room Freshener", category: "Household", price: 150, image: "https://placehold.co/400x300?text=Room+Freshener" },
    { id: 51, name: "Mosquito Repellent", category: "Household", price: 90, image: "https://placehold.co/400x300?text=Mosquito+Repellent" },
    { id: 52, name: "Matchbox Pack", category: "Household", price: 10, image: "https://placehold.co/400x300?text=Matchbox" },
    { id: 53, name: "Candles Pack", category: "Household", price: 25, image: "https://placehold.co/400x300?text=Candles" },
    { id: 54, name: "AA Batteries Pair", category: "Household", price: 40, image: "https://placehold.co/400x300?text=Batteries" },

    // Daily Essentials
    { id: 55, name: "Tata Salt", category: "Daily Essentials", price: 25, image: "https://placehold.co/400x300?text=Tata+Salt" },
    { id: 56, name: "Sugar Pack", category: "Daily Essentials", price: 30, image: "https://placehold.co/400x300?text=Sugar" },
    { id: 57, name: "Tata Tea", category: "Daily Essentials", price: 80, image: "https://placehold.co/400x300?text=Tata+Tea" },
    { id: 58, name: "Turmeric Powder", category: "Daily Essentials", price: 35, image: "https://placehold.co/400x300?text=Turmeric" },
    { id: 59, name: "Red Chilli Powder", category: "Daily Essentials", price: 40, image: "https://placehold.co/400x300?text=Chilli+Powder" },
    { id: 60, name: "Tissue Paper Pack", category: "Daily Essentials", price: 40, image: "https://placehold.co/400x300?text=Tissue+Paper" },
];

export const products = catalogProducts.map((product) => {
    const slug = product.name
        .replace(/\s+Biscuits$/i, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    return {
        ...product,
        slug,
        image: `/images/products/${slug}.jpg`,
        illustration: `/images/products/${slug}.svg`,
    };
});
