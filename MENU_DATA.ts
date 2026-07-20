// ============================================================
// MENU_DATA.ts — Aaron's Koshe Cafe & Restaurant
// Real menu synced from ilkabeachcafebar.au. Prices in AUD.
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
    id: "breakfast",
    label: "All-Day Breakfast",
    emoji: "🍳",
    note: "Served from 8:00am to 4:00pm",
    items: [
      { name: "Bondi Breakfast", price: 35, note: "Scrambled free-range eggs, sausage, bacon, two hash browns, mushrooms, grilled tomato, baked beans and butter, served with sourdough bread." },
      { name: "Turkish Breakfast Board", price: 35, note: "Sucuk and free-range eggs / menemen, olives, feta, tomatoes, cucumber, jam, honey and butter. Served with Turkish bread and Turkish tea." },
      { name: "Halloumi Breakfast", price: 27, note: "Scrambled free-range eggs, grilled halloumi, olives, smashed avocado, mixed leaves, tomato and cucumber salad, served with sourdough bread." },
      { name: "Vegan Breakfast", price: 25, note: "(VG) Falafels, olives, smashed avocado, mushrooms, mixed leaves, tomato and cucumber salad." },
      { name: "Sourdough Burrata Toast", price: 24, note: "Grilled artisan sourdough, ricotta pesto, rocket, grilled cherry tomatoes, whole burrata drizzled with extra virgin olive oil, finished with pomegranate molasses and a sprinkle of sea salt." },
      { name: "Eggs Benedict", price: 24, note: "Poached free-range eggs, smashed avocado, spinach, English muffin topped with hollandaise sauce. Choice of: Pastrami • Sucuk • Mushroom • Bacon." },
      { name: "Çılbır", price: 23, note: "Poached free-range eggs with yoghurt, sucuk, spiced burnt butter sauce, served with warm Turkish bread." },
      { name: "Simit Tava", price: 23, note: "Turkish bagel (simit) stuffed with cheese and sucuk, served with free-range eggs." },
      { name: "Fluffy Pancakes", price: 22, note: "Two fluffy pancakes served with berry compote and special honey–maple butter sauce." },
      { name: "Omelette", price: 21, note: "Eggs with tomatoes, baby spinach and mozzarella, served with one slice of toasted sourdough bread and butter." },
      { name: "Menemen", price: 19, note: "Turkish-style scrambled free-range eggs with Roma tomatoes, bull peppers and spices, topped with grated mozzarella. Served with warm Turkish bread." },
      { name: "Avocado Toast", price: 18, note: "Smashed avocado on sourdough bread with cherry tomatoes and rocket, topped with feta cheese." },
      { name: "Eggs", price: 16, note: "Poached, scrambled or fried free-range eggs, sourdough bread. Extras: Sucuk +$4 • Pastırma +$4 • Bacon +$4 • Feta +$4." },
      { name: "Egg Roll", price: 16, note: "Fried free-range egg, your choice of protein, tasty cheese and BBQ sauce on a toasted milk bun. Choice of: Sucuk • Pastrami • Bacon." },
      { name: "Halloumi Egg Roll", price: 15, note: "Grilled halloumi, fried free-range egg and peri peri sauce on a toasted milk bun." },
      { name: "Classic Turkish-Style Toastie", price: 15, note: "Toast in Turkish bread with cheese, sucuk, tomato, pickles, tomato sauce and mayo." },
    ],
  },
  {
    id: "acai",
    label: "Açaí Bowl",
    emoji: "🫐",
    items: [
      { name: "Açaí Bowl", price: 19, note: "Organic açaí, banana, strawberries, blueberries and granola. Extras: Nutella +$3 • Peanut butter +$3 • Pistachio cream +$3." },
    ],
  },
  {
    id: "brunch",
    label: "Lunch",
    emoji: "🥙",
    note: "Served from 11:00am to 7:00pm",
    items: [
      { name: "Gözleme", price: 20, note: "Gözleme served with a lemon slice, haydari (garlic yoghurt dip) and pickled green pepper. Choice of: Spinach & feta (V) • Lamb & spinach • Chicken & mushroom." },
      { name: "Wrap", price: 18, note: "Mixed salad wrapped in pita bread. Choice of: Turkish meatball with sumac • Grilled whiting fish with tartare sauce • Slow-cooked lamb +$3 • Falafel with hummus (VG) • Grilled chicken with peri peri sauce." },
      { name: "Salad", price: 18, note: "Mixed leaves, carrot, cucumber, tomatoes and cabbage, with Bondi salad dressing and a side of sauce. Choice of: Grilled salmon +$5 • Fried prawns +$3 • Turkish meatball • Grilled whiting fish • Grilled chicken • Grilled halloumi • Falafel." },
      { name: "Snack Pack", price: 18, note: "Chips with your choice of protein and two sauces. Choice of: Slow-cooked lamb +$3 • Grilled chicken • Grilled whiting fish • Grilled meatballs." },
      { name: "Lunch Plate", price: 30, note: "Potato chips, mixed salad with sauce. Choice of: Chicken schnitzel • Beef Scotch steak +$5 • Turkish meatball • Salmon +$5 • Whiting fish • Falafel." },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    emoji: "🍔",
    items: [
      { name: "Classic Burger", price: 18, note: "Wagyu beef patty, lettuce, tomato, caramelised onions and burger sauce on a soft milk bun." },
      { name: "Fish Burger", price: 16, note: "Grilled whiting fish, cheese, lettuce, tomato, pickles and tartare sauce on a soft milk bun." },
      { name: "Grilled Chicken Burger", price: 16, note: "Grilled chicken breast, lettuce, fresh tomato, cheddar cheese and peri peri sauce on a soft milk bun." },
      { name: "Cheese Burger", price: 16, note: "Wagyu beef patty, cheddar cheese, caramelised onions and tomato sauce on a soft milk bun." },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    emoji: "🥪",
    items: [
      { name: "Smoked Chicken Sandwich", price: 18, note: "Smoked chicken with aioli, brie, quince paste, rocket and tomato slices in Turkish bread." },
      { name: "Chicken Schnitzel Sandwich", price: 16, note: "Crispy chicken breast schnitzel, ricotta pesto, tomatoes, lettuce, sliced cheese and aioli in Turkish bread." },
      { name: "Halloumi Sandwich", price: 16, note: "Grilled halloumi, scrambled egg, tomatoes, smashed avocado, rocket and peri peri sauce in sourdough bread." },
      { name: "Tuna Panini", price: 16, note: "Tuna mix (capers, shallots, aioli, olives and tuna chunks), tomato and rocket in Turkish bread." },
      { name: "Vegetarian Caprese Panini", price: 16, note: "(V) Ricotta pesto, tomato, mozzarella slices, oregano and olive oil in Turkish bread." },
    ],
  },
  {
    id: "dips",
    label: "Dips",
    emoji: "🥣",
    items: [
      { name: "Hummus", price: 6, note: "A creamy blend of chickpeas, tahini, lemon juice and garlic, drizzled with olive oil and a hint of paprika." },
      { name: "Haydari", price: 6, note: "Thick, tangy strained yoghurt mixed with garlic, cheese and mint, finished with a drizzle of olive oil." },
      { name: "Babaganoush", price: 6, note: "Smoky, creamy eggplant blended with tahini, garlic, lemon juice and olive oil." },
      { name: "Ezme", price: 6, note: "A finely chopped mix of tomatoes, capsicum, onion, parsley and fresh herbs, spiced with chilli flakes, pomegranate molasses and olive oil." },
      { name: "Avocado & Tahini Dip", price: 6, note: "Creamy avocado blended with tahini, lemon and olive oil, yoghurt finished with Middle Eastern spices." },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    emoji: "🥗",
    items: [
      { name: "Chickpea Salad", price: 9, note: "Chickpea, mix leaves, cucumber, tomato, onion, and feta cheese, tossed with Bondi salad sauce." },
      { name: "Avocado Salad", price: 9, note: "Avocado, mix leaves, cucumber, tomato, onion, and feta cheese, tossed with Bondi salad sauce." },
      { name: "Mediterranean Salad", price: 8, note: "Mixed leaves, cucumber, tomato, red onion, olives, and feta cheese, tossed with Bondi salad sauce, and oregano." },
    ],
  },
  {
    id: "appetisers",
    label: "Appetisers",
    emoji: "🍟",
    items: [
      { name: "Cold Mezze Plate", price: 18, note: "4 dips of your choice. Served with pita bread." },
      { name: "Wedges", price: 15, note: "(V) With sweet chilli and sour cream." },
      { name: "Chips", price: 10, note: "(V) Bowl of crispy fried chips." },
      { name: "Falafel", price: 8, note: "(VG) 2 falafel." },
      { name: "Hash Brown", price: 4, note: "(V) 1 piece hash brown." },
    ],
  },
  {
    id: "pastries",
    label: "Bakery",
    emoji: "🥐",
    items: [
      { name: "Börek", price: 10 },
      { name: "Almond Croissant", price: 8 },
      { name: "Pistachio Croissant", price: 8 },
      { name: "Banana Bread", price: 7 },
      { name: "Croissant", price: 7 },
      { name: "Simit", price: 5 },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    emoji: "🍰",
    items: [
      { name: "Tiramisu", price: 12, note: "An Italian classic made with espresso-soaked ladyfingers, layered with mascarpone cream and dusted with cocoa powder." },
      { name: "Trilece", price: 10, note: "A soft, spongy cake soaked in a blend of three types of milk (cow, goat and condensed milk), topped with sauce. Light, moist and mildly sweet." },
      { name: "Cold Baklava", price: 10, note: "A refreshing twist on classic baklava, featuring thin layers of filo pastry, pistachios and butter, soaked in a cold sweet syrup for a crisp, cool bite." },
      { name: "Sütlaç (Turkish Rice Pudding)", price: 10, note: "A creamy rice pudding made with milk, rice and sugar, typically baked for a caramelised top layer. A comforting, mildly sweet dessert." },
      { name: "Baklava", price: 10, note: "A classic Turkish pastry made with layers of thin filo dough, chopped pistachios and a sweet, sticky syrup." },
      { name: "San Sebastian Cheesecake", price: 10, note: "A famous Basque-style cheesecake with a caramelised burnt top and a creamy centre, rich yet light in texture." },
      { name: "Fruit Loaf", price: 8, note: "A moist loaf cake baked with dried fruits, rolled oats, cinnamon and spice—perfect with tea." },
      { name: "Pistachio Brownie", price: 8, note: "A rich, fudgy chocolate brownie studded with pistachios for a nutty crunch." },
      { name: "Blueberry Muffin", price: 8, note: "A soft, fluffy muffin filled with juicy blueberries, lightly sweet and perfect with coffee." },
      { name: "Dubai Chocolate Muffin", price: 8, note: "A decadent muffin made with rich Dubai-style chocolate, soft inside with a gooey chocolate centre." },
    ],
  },
  {
    id: "coffee",
    label: "Hot Coffee",
    emoji: "☕",
    items: [
      { name: "Spanish Latte", price: 7 },
      { name: "Dirty Chai Latte", price: 7 },
      { name: "Pistachio Coffee Latte", price: 7 },
      { name: "Mocha", price: 7 },
      { name: "Hot Chocolate", price: 7 },
      { name: "Turmeric Latte", price: 7 },
      { name: "Turkish Coffee", price: 6 },
      { name: "Long Black", price: 6 },
      { name: "Flat White", price: 6 },
      { name: "Cappuccino", price: 6 },
      { name: "Latte", price: 6 },
      { name: "Macchiato", price: 6 },
      { name: "Chai Latte", price: 6 },
      { name: "Matcha Latte", price: 6 },
      { name: "Espresso", price: 5 },
      { name: "Piccolo", price: 5 },
      { name: "Babyccino", price: 3 },
    ],
  },
  {
    id: "tea",
    label: "Tea",
    emoji: "🍵",
    items: [
      { name: "English Breakfast Tea", price: 6 },
      { name: "Earl Grey", price: 6 },
      { name: "Peppermint", price: 6 },
      { name: "Green Tea", price: 6 },
      { name: "Lemongrass", price: 6 },
      { name: "Chamomile", price: 6 },
      { name: "Turkish Tea", price: 5 },
    ],
  },
  {
    id: "iced-coffee",
    label: "Iced Coffee",
    emoji: "🧊",
    items: [
      { name: "Iced Strawberry Matcha Latte", price: 10 },
      { name: "Oreo Frappé", price: 10 },
      { name: "Coffee Frappé", price: 9 },
      { name: "Iced Pistachio Latte", price: 9 },
      { name: "Coffee Lemonade", price: 9 },
      { name: "Iced Coconut Mocha", price: 9 },
      { name: "Iced Spanish Latte", price: 9 },
      { name: "Iced Mocha", price: 9 },
      { name: "Cold Brew", price: 9 },
      { name: "Iced Dirty Matcha Latte", price: 9 },
      { name: "Iced Matcha Latte", price: 9 },
      { name: "Iced Turmeric Latte", price: 9 },
      { name: "Iced Hot Chocolate", price: 9 },
      { name: "Iced Dirty Chai Latte", price: 9 },
      { name: "Iced Chai Latte", price: 9 },
      { name: "Iced Latte", price: 9 },
      { name: "Iced Long Black", price: 8 },
    ],
  },
  {
    id: "smoothies",
    label: "Smoothies",
    emoji: "🥤",
    items: [
      { name: "Refresher Smoothie", price: 12, note: "Banana, strawberry, yoghurt, coconut milk, honey" },
      { name: "Green Smoothie", price: 12, note: "Spinach, apple, celery, cucumber, coconut milk, yoghurt, honey" },
      { name: "Pineapple & Mango Smoothie", price: 12, note: "Mango, pineapple, yoghurt, honey, milk" },
      { name: "Banana Buzz", price: 12, note: "Milk, banana, honey, yoghurt, ice" },
      { name: "All Berry Blast", price: 12, note: "Mixed berries, apple juice" },
      { name: "Exotic Smoothie", price: 12, note: "Pineapple, mango, avocado, yoghurt, honey, coconut milk" },
      { name: "Berry Smoothie", price: 12, note: "Mixed berries, yoghurt, honey, milk" },
      { name: "Mango Smoothie", price: 12, note: "Mango, yoghurt, honey, milk" },
    ],
  },
  {
    id: "juices",
    label: "Fresh Juice",
    emoji: "🍊",
    items: [
      { name: "Green Goodness", price: 10, note: "Apple, spinach, celery, ginger, cucumber" },
      { name: "Orange Bliss", price: 10, note: "Orange, carrot, pineapple, ginger" },
      { name: "Lemon & Lime Bitter", price: 10, note: "Lemonade, lime juice, sparkling water, ice" },
      { name: "Lemon Mint Crush", price: 10, note: "Lemonade, fresh mint, ice, sparkling water" },
      { name: "Orange Juice", price: 10, note: "Freshly squeezed orange" },
      { name: "Watermelon Juice", price: 10, note: "Watermelon" },
      { name: "Sparkling Pomegranate", price: 10, note: "Pomegranate juice and sparkling water" },
      { name: "Sparkling Cherry", price: 10, note: "Cherry juice and sparkling water" },
    ],
  },
  {
    id: "milkshakes",
    label: "Milkshakes & Thickshakes",
    emoji: "🥛",
    items: [
      { name: "Chocolate", price: 10 },
      { name: "Strawberry", price: 10 },
      { name: "Caramel", price: 10 },
      { name: "Vanilla", price: 10 },
      { name: "Banana", price: 10 },
    ],
  },
  {
    id: "soft-drinks",
    label: "Soft Drinks",
    emoji: "🧃",
    items: [
      { name: "Coca-Cola / Pepsi", price: 6 },
      { name: "Coca-Cola Zero / Pepsi Max", price: 6 },
      { name: "Sunkist / Fanta", price: 6 },
      { name: "Solo / Sprite", price: 6 },
      { name: "Uludag", price: 6 },
      { name: "Uludag Orange", price: 6 },
      { name: "Water", price: 4 },
      { name: "Sparkling Water", price: 4 },
      { name: "Red Bull", price: 7 },
      { name: "Iced Tea", price: 7 },
      { name: "Powerade", price: 7 },
    ],
  },
];

export default MENU_CATEGORIES;
