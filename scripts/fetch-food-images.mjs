#!/usr/bin/env node

/**
 * Fetch food item images from Unsplash for items in food.json
 *
 * How it works:
 *   1. Reads content/food.json for unique food item names
 *   2. Normalizes similar items to avoid duplicate searches
 *   3. Searches Unsplash's internal API for each item
 *   4. Downloads the first result (w=400) to public/food-images/
 *   5. Updates food.json with image paths per item
 *
 * Usage:
 *   node scripts/fetch-food-images.mjs           # only fetch missing images
 *   node scripts/fetch-food-images.mjs --force    # re-download all images
 */

import fs from "fs"
import path from "path"

const FOOD_PATH = "./content/food.json"
const IMAGES_DIR = "./public/food-images"
const force = process.argv.includes("--force")

// Map item names to better search queries
const SEARCH_OVERRIDES = {
  "idli": "south indian idli",
  "idli 2pcs": "south indian idli",
  "idli with 1 vada": "idli vada",
  "idli + vada": "idli vada",
  "2 idli + 2 vada": "idli vada",
  "combo - 2 idly 1 vada": "idli vada",
  "uddina vada": "medu vada",
  "udina vada": "medu vada",
  "vada": "medu vada",
  "maddur vada": "maddur vada indian snack",
  "set dosa": "set dosa south indian",
  "masala dosa": "masala dosa",
  "masala dosa ghee": "masala dosa ghee",
  "ghee masala dosa": "masala dosa ghee",
  "paper roast masala dosa": "paper dosa",
  "rava dosa": "rava dosa",
  "aloo paratha with curd and pickle": "aloo paratha",
  "2 aloo paratha": "aloo paratha",
  "2 aloo paratha with curd and pickle": "aloo paratha",
  "sambar rice": "sambar rice south indian",
  "bisibele bath": "bisibele bath karnataka",
  "kesari bath": "kesari bath sweet",
  "veg fried rice": "vegetable fried rice",
  "mini meal": "south indian thali",
  "pindi chole rice bowl": "chole rice bowl",
  "extra chutney": "coconut chutney",
  "sweet lassi": "sweet lassi drink",
  "tomato ketchup": "tomato ketchup sachet",
  "mini coke": "coca cola can",
  "coca cola": "coca cola bottle",
  "coke zero can": "coke zero can",
  "medium pepsi black": "pepsi can",
  "margherita cheese burst": "cheese burst pizza",
  "farmhouse cheese burst": "farmhouse pizza",
  "paneer & capsicum pizza mania": "paneer pizza",
  "golden corn": "golden corn pizza",
  "garlic breadsticks": "garlic breadsticks dominos",
  "paneer tikka stuffed garlic bread": "paneer tikka garlic bread",
  "choco lava cake": "chocolate lava cake",
  "cheesy dip": "cheese dip",
  "veg whopper": "veg whopper burger",
  "veg whopper combo": "veg whopper burger combo",
  "king fries + medium pepsi": "french fries",
  "medium fries": "french fries",
  "single cheese slice": "cheese slice",
  "fiery hell dip": "chilli dip",
  "veggie strips": "veggie strips fried",
  "veg samosa": "samosa indian",
  "veg puff": "veg puff pastry",
  "red velvet cup cake eggless mini": "red velvet cupcake",
  "red velvet cupcake big": "red velvet cupcake",
  "red velvet cup cake": "red velvet cupcake",
  "eggless chocolate cheese mousse": "chocolate mousse",
  "eggless rich chocolate pastry": "chocolate pastry",
  "eggless dutch truffle pastry": "chocolate truffle cake",
  "eggless black forest": "black forest cake",
  "eggless chocolate truffle": "chocolate truffle cake",
  "choco-vanilla": "choco vanilla pastry",
  "gulab jamun": "gulab jamun indian sweet",
  "basil pesto pasta chicken salad": "pesto pasta salad",
  "barbeque paneer rice bowl": "paneer rice bowl",
  "grilled barbeque chicken rice bowl": "bbq chicken rice bowl",
  "crispy peri peri chicken rice bowl": "peri peri chicken rice",
  "bingo original style chilli sprinkled potato chips": "potato chips",
  "cadbury bournville rich cocoa 50% dark chocolate bar": "dark chocolate bar",
  "cadbury chocobakes choc layered cake": "chocolate layered cake",
  "yogabar chocolate chunk energy protein bars": "protein bar",
  "yogabar 100% rolled oats": "rolled oats",
  "nandini curd": "curd yogurt",
  "nandini shubam milk": "milk packet",
  "nandini pasteurised toned milk": "milk packet",
  "heritage pouch curd": "curd yogurt",
  "aashirvaad superior mp atta": "wheat flour bag",
  "coconut": "coconut",
  "green chilli": "green chilli",
  "yellaki banana": "banana bunch",
  "saffola active honey": "honey jar",
  "desidiya pixel led lights warm white": "led string lights",
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "").replace(/^-+/, "")
}

function normalizeItemName(name) {
  return name.toLowerCase()
    .replace(/\s*\[.*?\]\s*/g, " ")
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\d+\s*(pc|pcs|pieces?|grams?|ml)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
}

async function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=1`
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "Accept": "application/json",
    }
  })
  if (!res.ok) return null
  const data = await res.json()
  if (!data.results || data.results.length === 0) return null
  return data.results[0].urls?.small || data.results[0].urls?.regular
}

async function downloadImage(url, filepath) {
  const res = await fetch(url)
  if (!res.ok) return false
  fs.writeFileSync(filepath, Buffer.from(await res.arrayBuffer()))
  return true
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true })

  const orders = JSON.parse(fs.readFileSync(FOOD_PATH, "utf8"))

  // Collect unique normalized item names
  const itemMap = new Map() // normalized -> original name
  for (const o of orders) {
    for (const i of o.items) {
      const norm = normalizeItemName(i.name)
      if (!itemMap.has(norm)) itemMap.set(norm, i.name)
    }
  }

  // Deduplicate search queries (many items map to same image)
  const searchMap = new Map() // slug -> { query, normalized names }
  for (const [norm] of itemMap) {
    const query = SEARCH_OVERRIDES[norm] || norm
    const slug = slugify(query)
    if (!searchMap.has(slug)) {
      searchMap.set(slug, { query, norms: [] })
    }
    searchMap.get(slug).norms.push(norm)
  }

  console.log(`${itemMap.size} unique items → ${searchMap.size} unique searches\n`)

  let success = 0, skipped = 0, fail = 0
  const failed = []
  const imageMapping = {} // normalized item name -> image path

  for (const [slug, { query, norms }] of searchMap) {
    const filepath = path.join(IMAGES_DIR, `${slug}.jpg`)
    const imagePath = `/food-images/${slug}.jpg`

    if (!force && fs.existsSync(filepath)) {
      console.log(`⏭ ${query} (exists)`)
      skipped++
      for (const n of norms) imageMapping[n] = imagePath
      continue
    }

    try {
      const imgUrl = await searchUnsplash(query)
      if (imgUrl && await downloadImage(imgUrl, filepath)) {
        console.log(`✓ ${query}`)
        success++
        for (const n of norms) imageMapping[n] = imagePath
      } else {
        console.log(`✗ ${query}`)
        failed.push(query)
        fail++
      }
    } catch (e) {
      console.log(`✗ ${query} — ${e.message}`)
      failed.push(query)
      fail++
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 300))
  }

  // Update food.json — add image field to each item
  for (const o of orders) {
    for (const i of o.items) {
      const norm = normalizeItemName(i.name)
      if (imageMapping[norm]) {
        i.image = imageMapping[norm]
      }
    }
  }
  fs.writeFileSync(FOOD_PATH, JSON.stringify(orders, null, 2) + "\n")

  console.log(`\nDone: ${success} downloaded, ${skipped} skipped, ${fail} failed`)
  if (failed.length) console.log("Failed:", failed.join(", "))
}

main()
