// ============================================================
// MENU_DATA.ts — Aaron's Koshe Cafe & Restaurant
// Full cafe & restaurant menu. Prices in AUD.
// ============================================================

export interface MenuItem {
  code?: number | string;
  name: string;
  price: number;
  note?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  emoji?: string;
  items: MenuItem[];
  note?: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "coffee",
    label: "Specialty Coffee",
    emoji: "☕",
    note: "Single origin, ethically sourced · Oat, almond, soy or macadamia milk +$0.70",
    items: [
      { name: "Flat White", price: 5.5, note: "Our signature — silky micro-foam over single-origin espresso" },
      { name: "Espresso", price: 4.5 },
      { name: "Double Espresso", price: 5 },
      { name: "Cappuccino", price: 5.5 },
      { name: "Latte", price: 5.5 },
      { name: "Long Black", price: 5 },
      { name: "Piccolo Latte", price: 4.5 },
      { name: "Cortado", price: 5 },
      { name: "Cold Brew", price: 7, note: "Slow-steeped for 18 hours, served over ice" },
      { name: "Iced Latte", price: 6.5 },
      { name: "Matcha Latte", price: 7, note: "Ceremonial-grade Japanese matcha" },
      { name: "Chai Latte", price: 6.5, note: "House-made spiced chai blend" },
    ],
  },
  {
    id: "breakfast",
    label: "All-Day Breakfast",
    emoji: "🍳",
    note: "Served daily 5:00 AM – 3:00 PM",
    items: [
      { name: "Smashed Avo & Feta", price: 22, note: "House sourdough, Persian feta, cherry tomatoes, dukkah, lemon" },
      { name: "Big Bondi Breakfast", price: 28, note: "Two free-range eggs, bacon, halloumi, mushroom, spinach, sourdough" },
      { name: "Eggs Benedict", price: 26, note: "Slow-poached eggs, house-cured salmon, hollandaise, English muffin" },
      { name: "Acai Bowl", price: 22, note: "Wild acai, banana, granola, seasonal fruit, coconut flakes, honey" },
      { name: "Granola & Yoghurt", price: 18, note: "House granola, sheep's milk yoghurt, seasonal compote" },
      { name: "Avo Toast", price: 18, note: "Avocado, sourdough, sea salt, chilli flakes" },
      { name: "Eggs Your Way", price: 16, note: "Scrambled, poached or fried on sourdough" },
      { name: "French Toast", price: 22, note: "Brioche, berry compote, crème fraîche, maple syrup" },
      { name: "Bircher Muesli", price: 16, note: "Apple, orange, honey, toasted almonds" },
    ],
  },
  {
    id: "brunch",
    label: "Brunch & Lunch",
    emoji: "🥑",
    note: "Served daily 9:00 AM – 3:00 PM",
    items: [
      { name: "Grilled Barramundi Bowl", price: 28, note: "Sushi rice, edamame, cucumber, pickled ginger, sesame dressing" },
      { name: "Bondi Beef Burger", price: 26, note: "180g Angus patty, aged cheddar, house pickles, brioche bun, fries" },
      { name: "Smoked Salmon Bagel", price: 24, note: "House-cured salmon, cream cheese, capers, red onion, dill" },
      { name: "Chicken Caesar Wrap", price: 22, note: "Grilled chicken, cos, parmesan, crispy bacon, Caesar dressing" },
      { name: "Falafel & Hummus Bowl", price: 22, note: "House falafel, whipped hummus, tabbouleh, sumac, pita" },
      { name: "Burrata & Heirloom Tomato", price: 24, note: "Fresh burrata, heirloom tomatoes, basil oil, sourdough crostini" },
      { name: "Crispy Fish Tacos", price: 24, note: "Three beer-battered fish tacos, slaw, chipotle mayo, jalapeño" },
      { name: "Garden Green Bowl", price: 22, note: "Quinoa, kale, avocado, roasted seeds, tahini lemon dressing (VG · GF)" },
    ],
  },
  {
    id: "smoothies",
    label: "Smoothies & Cold Drinks",
    emoji: "🥤",
    note: "Blended fresh to order",
    items: [
      { name: "Bondi Sunrise", price: 12, note: "Mango, passionfruit, orange, pineapple" },
      { name: "Green Machine", price: 12, note: "Spinach, banana, almond milk, honey, chia" },
      { name: "Berry Blast", price: 12, note: "Mixed berries, banana, coconut water, acai" },
      { name: "Tropical Twist", price: 12, note: "Coconut, pineapple, mango, lime" },
      { name: "Freshly Squeezed Orange Juice", price: 9 },
      { name: "Watermelon Juice", price: 9 },
      { name: "Coconut Water", price: 7 },
      { name: "Sparkling / Still Water", price: 5 },
      { name: "Kombucha", price: 8, note: "Rotating local flavours — ask the team" },
    ],
  },
  {
    id: "pastries",
    label: "Pastries & Sweets",
    emoji: "🥐",
    note: "Baked fresh every morning",
    items: [
      { name: "Butter Croissant", price: 6 },
      { name: "Almond Croissant", price: 7.5 },
      { name: "Chocolate Croissant", price: 7.5 },
      { name: "Banana Bread", price: 8, note: "Toasted, with butter" },
      { name: "Blueberry Muffin", price: 6.5 },
      { name: "Carrot & Walnut Cake", price: 9.5, note: "Cream cheese frosting" },
      { name: "Chocolate Brownie", price: 8.5 },
      { name: "Cheesecake of the Day", price: 10, note: "Ask the team" },
      { name: "Acai Cheesecake", price: 11, note: "Wild acai, coconut base, passionfruit glaze" },
    ],
  },
  {
    id: "bar",
    label: "Cocktails & Bar",
    emoji: "🍹",
    note: "Served daily from 5:00 PM",
    items: [
      { name: "Espresso Martini", price: 22, note: "Vodka, Kahlúa, fresh espresso shot, vanilla" },
      { name: "Bondi Beach Cocktail", price: 22, note: "Passionfruit vodka, Malibu, pineapple, lime" },
      { name: "Aperol Spritz", price: 19, note: "Aperol, prosecco, soda, orange slice" },
      { name: "Hugo Spritz", price: 19, note: "St-Germain elderflower, prosecco, mint, lime" },
      { name: "Watermelon Margarita", price: 22, note: "Tequila, fresh watermelon, lime, tajín rim" },
      { name: "Virgin Mojito", price: 13, note: "Mint, lime, coconut water, soda" },
      { name: "Glass of Wine", price: 14, note: "White / Red / Rosé / Sparkling — $14–$16" },
      { name: "Local Craft Beer", price: 12, note: "Ask the team for today's taps" },
      { name: "Draught Cider", price: 11 },
    ],
  },
];

export default MENU_CATEGORIES;
