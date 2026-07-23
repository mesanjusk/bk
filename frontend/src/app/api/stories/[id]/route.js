import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb.js';
import Story from '../../../../models/Story.js';
import { requireAdmin } from '../../../../lib/auth.js';
import { ApiError, handleApiError } from '../../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  try {
    requireAdmin(request);
    await connectDB();

    const { id } = await params;
    const story = await Story.findById(id);
    if (!story) {
      throw new ApiError(404, 'Story not found.');
    }
    return NextResponse.json(story);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    requireAdmin(request);
    await connectDB();

    const { id } = await params;
    const { name, state, photoUrl, before, after, narrative, extended } = await request.json();

    const story = await Story.findByIdAndUpdate(
      id,
      { name, state, photoUrl, before, after, narrative, extended },
      { new: true, runValidators: true }
    );

    if (!story) {
      throw new ApiError(404, 'Story not found.');
    }

    return NextResponse.json(story);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    requireAdmin(request);
    await connectDB();

    const { id } = await params;
    const story = await Story.findByIdAndDelete(id);

    if (!story) {
      throw new ApiError(404, 'Story not found.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
