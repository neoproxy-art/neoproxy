import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const catalogPath = path.join(process.cwd(), 'kernel', 'catalog.json');

    // Check if catalog exists
    try {
      await fs.access(catalogPath);
    } catch {
      return NextResponse.json([], { status: 200 });
    }

    // Read catalog
    const catalogData = await fs.readFile(catalogPath, 'utf-8');
    const catalog = JSON.parse(catalogData);

    return NextResponse.json(catalog);
  } catch (error) {
    console.error('Error reading catalog:', error);
    return NextResponse.json(
      { error: 'Failed to read catalog' },
      { status: 500 }
    );
  }
}