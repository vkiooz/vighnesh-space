#!/usr/bin/env node

/**
 * Fetch movie posters from TMDb using IMDb IDs in movies.json
 *
 * How it works:
 *   1. Reads content/movies.json for unique movies with imdb_url
 *   2. Uses TMDb's redirect endpoint to find the movie page via IMDb ID
 *   3. Scrapes the English poster path from the TMDb posters page
 *   4. Downloads the poster (w500 quality) to public/posters/
 *   5. Updates movies.json with the poster path
 *
 * Usage:
 *   node scripts/fetch-posters.mjs           # only fetch missing posters
 *   node scripts/fetch-posters.mjs --force   # re-download all posters
 */

import fs from "fs"
import path from "path"

const MOVIES_PATH = "./content/movies.json"
const POSTERS_DIR = "./public/posters"
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  "Accept-Language": "en-US,en;q=0.9",
}

const force = process.argv.includes("--force")

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")
}

async function fetchEnglishPoster(imdbId) {
  // Find TMDb page via IMDb ID redirect
  const findRes = await fetch(
    `https://www.themoviedb.org/redirect?external_source=imdb_id&external_id=${imdbId}`,
    { headers: HEADERS, redirect: "follow" }
  )
  const url = findRes.url

  // Try English posters page first
  const postersRes = await fetch(url + "/images/posters?language=en", { headers: HEADERS })
  let html = await postersRes.text()
  let match = html.match(/\/t\/p\/w300_and_h450_face(\/[a-zA-Z0-9]+\.jpg)/)

  // Fallback to main page
  if (!match) {
    const mainRes = await fetch(url + "?language=en-US", { headers: HEADERS })
    html = await mainRes.text()
    match =
      html.match(/\/t\/p\/w300_and_h450_face(\/[a-zA-Z0-9]+\.jpg)/) ||
      html.match(/\/t\/p\/w500(\/[a-zA-Z0-9]+\.jpg)/)
  }

  if (!match) return null
  return `https://image.tmdb.org/t/p/w500${match[1]}`
}

async function downloadImage(url, filepath) {
  const res = await fetch(url)
  if (!res.ok) return false
  fs.writeFileSync(filepath, Buffer.from(await res.arrayBuffer()))
  return true
}

async function main() {
  if (!fs.existsSync(POSTERS_DIR)) fs.mkdirSync(POSTERS_DIR, { recursive: true })

  const movies = JSON.parse(fs.readFileSync(MOVIES_PATH, "utf8"))
  const unique = [...new Map(movies.map((m) => [m.title, m])).values()]

  let success = 0
  let skipped = 0
  let fail = 0
  const failed = []

  for (const m of unique) {
    const slug = slugify(m.title)
    const filepath = path.join(POSTERS_DIR, `${slug}.jpg`)
    const imdbId = m.imdb_url?.match(/tt\d+/)?.[0]

    if (!imdbId) {
      console.log(`⏭ ${m.title} (no IMDb ID)`)
      skipped++
      continue
    }

    if (!force && fs.existsSync(filepath)) {
      console.log(`⏭ ${m.title} (exists)`)
      skipped++
      continue
    }

    try {
      const posterUrl = await fetchEnglishPoster(imdbId)
      if (posterUrl && (await downloadImage(posterUrl, filepath))) {
        console.log(`✓ ${m.title}`)
        success++
      } else {
        console.log(`✗ ${m.title}`)
        failed.push(m.title)
        fail++
      }
    } catch (e) {
      console.log(`✗ ${m.title} — ${e.message}`)
      failed.push(m.title)
      fail++
    }

    await new Promise((r) => setTimeout(r, 400))
  }

  // Update movies.json with poster paths
  for (const m of movies) {
    const slug = slugify(m.title)
    const filepath = path.join(POSTERS_DIR, `${slug}.jpg`)
    if (fs.existsSync(filepath)) {
      m.poster = `/posters/${slug}.jpg`
    }
  }
  fs.writeFileSync(MOVIES_PATH, JSON.stringify(movies, null, 2) + "\n")

  console.log(`\nDone: ${success} downloaded, ${skipped} skipped, ${fail} failed`)
  if (failed.length) console.log("Failed:", failed.join(", "))
}

main()
