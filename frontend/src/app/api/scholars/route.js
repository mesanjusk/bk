import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb.js';
import Scholar from '../../../models/Scholar.js';
import { requireAdmin } from '../../../lib/auth.js';
import { ApiError, handleApiError } from '../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const filter = year ? { year: Number(year) } : {};
    const scholars = await Scholar.find(filter).sort({ year: -1, order: 1, name: 1 });
    return NextResponse.json(scholars);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    requireAdmin(request);
    await connectDB();

    const { name, year, description, photoUrl, state, score, category, order, bio, achievements } =
      await request.json();

    if (!name || !year) {
      throw new ApiError(400, 'Name and year are required.');
    }

    let resolvedOrder = order;
    if (resolvedOrder === undefined || resolvedOrder === null || resolvedOrder === '') {
      const last = await Scholar.findOne({ year }).sort({ order: -1 }).select('order');
      resolvedOrder = last ? last.order + 1 : 1;
    }

    const resolvedDescription = description?.trim()
      ? description.trim()
      : category
      ? `${category} — Badhte Kadam Scholar, ${year}`
      : `Badhte Kadam Scholar, ${year}`;

    const scholar = await Scholar.create({
      name,
      year,
      description: resolvedDescription,
      photoUrl,
      state,
      score,
      category,
      order: resolvedOrder,
      bio,
      achievements,
    });

    return NextResponse.json(scholar, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
