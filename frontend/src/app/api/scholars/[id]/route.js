import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb.js';
import Scholar from '../../../../models/Scholar.js';
import { requireAdmin } from '../../../../lib/auth.js';
import { ApiError, handleApiError } from '../../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const scholar = await Scholar.findById(id);
    if (!scholar) {
      throw new ApiError(404, 'Scholar not found.');
    }
    return NextResponse.json(scholar);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    requireAdmin(request);
    await connectDB();

    const { id } = await params;
    const { name, year, description, photoUrl, state, score, category, order, bio, achievements } =
      await request.json();

    const scholar = await Scholar.findByIdAndUpdate(
      id,
      { name, year, description, photoUrl, state, score, category, order, bio, achievements },
      { new: true, runValidators: true }
    );

    if (!scholar) {
      throw new ApiError(404, 'Scholar not found.');
    }

    return NextResponse.json(scholar);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    requireAdmin(request);
    await connectDB();

    const { id } = await params;
    const scholar = await Scholar.findByIdAndDelete(id);

    if (!scholar) {
      throw new ApiError(404, 'Scholar not found.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
