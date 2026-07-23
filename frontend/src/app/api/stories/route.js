import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb.js';
import Story from '../../../models/Story.js';
import { requireAdmin } from '../../../lib/auth.js';
import { ApiError, handleApiError } from '../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();
    const stories = await Story.find().sort({ createdAt: 1 });
    return NextResponse.json(stories);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    requireAdmin(request);
    await connectDB();

    const { name, state, photoUrl, before, after, narrative, extended } = await request.json();

    if (!name || !before || !after || !narrative) {
      throw new ApiError(400, 'Name, before, after and narrative are required.');
    }

    const story = await Story.create({ name, state, photoUrl, before, after, narrative, extended });
    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
