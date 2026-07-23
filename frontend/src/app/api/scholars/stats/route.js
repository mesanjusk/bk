import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb.js';
import Scholar from '../../../../models/Scholar.js';
import { handleApiError } from '../../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();

    const [scholarCount, years, states] = await Promise.all([
      Scholar.countDocuments(),
      Scholar.distinct('year'),
      Scholar.distinct('state'),
    ]);

    return NextResponse.json({
      scholars: scholarCount,
      years: years.length,
      states: states.filter(Boolean).length,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
