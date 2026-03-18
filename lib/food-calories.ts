// Calorie estimates per serving (kcal)
// These are approximate values for typical restaurant portions

const CALORIE_MAP: Record<string, number> = {
  // South Indian
  "idli": 80,           // per 2 pcs
  "idly": 80,
  "vada": 150,          // per 2 pcs
  "masala dosa": 300,
  "set dosa": 250,
  "rava dosa": 280,
  "paper roast": 270,
  "ghee masala dosa": 350,
  "sambar rice": 320,
  "bisibele bath": 350,
  "kesari bath": 250,
  "mini meal": 450,
  "chutney": 30,

  // Paratha
  "aloo paratha": 350,  // 2 pcs with curd

  // Pizza & Dominos
  "margherita": 800,
  "farmhouse": 900,
  "cheese burst": 850,
  "pizza mania": 400,
  "golden corn": 400,
  "garlic bread": 300,
  "paneer tikka stuffed garlic bread": 400,
  "lava cake": 200,     // per piece

  // Burger King
  "veg whopper combo": 750,
  "veg whopper": 550,
  "veggie strips": 200,
  "medium fries": 320,
  "king fries": 350,

  // Rice bowls
  "pindi chole rice bowl": 500,
  "veg fried rice": 400,
  "barbeque paneer rice bowl": 550,
  "grilled barbeque chicken rice bowl": 500,
  "crispy peri peri chicken rice bowl": 520,
  "basil pesto pasta chicken salad": 450,

  // Bakery & Desserts
  "red velvet": 280,
  "black forest": 300,
  "chocolate truffle": 320,
  "chocolate pastry": 300,
  "dutch truffle": 320,
  "chocolate cheese mousse": 280,
  "choco-vanilla": 250,
  "veg samosa": 150,
  "veg puff": 200,
  "gulab jamun": 150,   // per 2 pcs

  // Drinks
  "sweet lassi": 180,
  "coca cola": 140,
  "coke zero": 5,
  "mini coke": 90,
  "pepsi": 150,

  // Condiments
  "tomato ketchup": 15,
  "cheesy dip": 80,
  "fiery hell dip": 30,
  "cheese slice": 60,

  // Grocery (Instamart) - per pack
  "nandini curd": 90,
  "nandini shubam milk": 120,
  "nandini pasteurised toned milk": 100,
  "heritage pouch curd": 90,
  "aashirvaad": 0,      // raw ingredient
  "coconut": 150,
  "green chilli": 5,
  "yellaki banana": 90,
  "saffola active honey": 60,
  "yogabar 100% rolled oats": 370,
  "yogabar chocolate chunk": 190,
  "bingo": 130,
  "cadbury bournville": 250,
  "cadbury chocobakes": 120,
  "desidiya pixel led": 0,
}

export function getItemCalories(itemName: string): number | null {
  const name = itemName.toLowerCase()
  // Try longest match first for specificity
  const entries = Object.entries(CALORIE_MAP).sort((a, b) => b[0].length - a[0].length)
  for (const [keyword, cal] of entries) {
    if (name.includes(keyword)) return cal
  }
  return null
}

export function getOrderCalories(items: { name: string; quantity: number }[]): number | null {
  let total = 0
  let hasAny = false
  for (const item of items) {
    const cal = getItemCalories(item.name)
    if (cal !== null) {
      total += cal * item.quantity
      hasAny = true
    }
  }
  return hasAny ? total : null
}
