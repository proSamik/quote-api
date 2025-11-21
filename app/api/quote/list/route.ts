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

export async function GET(request: Request) {
  try {
    const quotes = loadQuotes();

    // Get query parameters for optional filtering
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const category = searchParams.get('category');

    let filteredQuotes = quotes;

    // Filter by category if provided
    if (category) {
      filteredQuotes = quotes.filter((quote: any) =>
        quote.categories.includes(category)
      );
    }

    // Limit results if specified
    if (limit) {
      const limitNum = parseInt(limit, 10);
      filteredQuotes = filteredQuotes.slice(0, limitNum);
    }

    return NextResponse.json(filteredQuotes, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error reading quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes list' },
      { status: 500 }
    );
  }
}
