import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'staff-credentials.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Credentials file not found' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const credentials = JSON.parse(fileContent);

    return NextResponse.json(credentials, { status: 200 });

  } catch (error) {
    console.error('Error loading credentials:', error);
    return NextResponse.json(
      { error: 'Failed to load credentials' },
      { status: 500 }
    );
  }
}
