import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'quotes.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const quotes = JSON.parse(fileContents);

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

    return NextResponse.json(filteredQuotes);
  } catch (error) {
    console.error('Error reading quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes list' },
      { status: 500 }
    );
  }
}
