import { readFile } from 'fs/promises';
import path from 'path';

export interface Quote {
  id: string;
  text: string;
  author?: string;
  source?: string;
  sourceUrl?: string;
}

// Function to get all quotes from the JSON file
export async function getQuotes(): Promise<Quote[]> {
  try {
    const quotesPath = path.join(process.cwd(), 'content', 'quotes.json');
    const fileContents = await readFile(quotesPath, 'utf8');
    const quotes = JSON.parse(fileContents) as Quote[];
    return quotes;
  } catch (error) {
    console.error('Error reading quotes:', error);
    return [];
  }
}