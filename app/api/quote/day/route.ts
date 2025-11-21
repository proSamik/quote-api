import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache quotes data in memory
let quotesCache: any[] | null = null;

function loadQuotes(): any[] {
  if (quotesCache === null) {
    const filePath = path.join(process.cwd(), 'public', 'quotes.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    quotesCache = JSON.parse(fileContents);
  }
  return quotesCache!;
}

export async function GET() {
  try {
    const quotes = loadQuotes();

    // Shuffle and return one random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Return as array to match the expected API format with cache headers
    return NextResponse.json([randomQuote], {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error reading quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote of the day' },
      { status: 500 }
    );
  }
}
