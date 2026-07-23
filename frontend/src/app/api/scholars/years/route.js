import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb.js';
import Scholar from '../../../../models/Scholar.js';
import { handleApiError } from '../../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();
    const years = await Scholar.distinct('year');
    return NextResponse.json(years.sort((a, b) => b - a));
  } catch (error) {
    return handleApiError(error);
  }
}
