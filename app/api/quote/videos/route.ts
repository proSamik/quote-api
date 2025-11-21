import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Cache videos data in memory
let videosCache: any[] | null = null;

function loadVideos(): any[] {
  if (videosCache === null) {
    const filePath = path.join(process.cwd(), 'public', 'videos.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    videosCache = JSON.parse(fileContents);
  }
  return videosCache!;
}

export async function GET(request: Request) {
  try {
    const videos = loadVideos();

    // Get query parameters for optional filtering
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let filteredVideos = videos;

    // Limit results if specified
    if (limit) {
      const limitNum = parseInt(limit, 10);
      filteredVideos = filteredVideos.slice(0, limitNum);
    }

    return NextResponse.json(filteredVideos, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error reading videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos list' },
      { status: 500 }
    );
  }
}
