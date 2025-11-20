import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'quotes.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const quotes = JSON.parse(fileContents);

    // Shuffle and return one random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Return as array to match the expected API format
    return NextResponse.json([randomQuote]);
  } catch (error) {
    console.error('Error reading quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote of the day' },
      { status: 500 }
    );
  }
}
