import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb.js';
import Scholar from '../../../../../models/Scholar.js';
import { handleApiError } from '../../../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { year } = await params;
    const scholars = await Scholar.find({ year: Number(year) }).sort({ order: 1, name: 1 });
    return NextResponse.json(scholars);
  } catch (error) {
    return handleApiError(error);
  }
}
