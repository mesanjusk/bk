import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb.js';
import Scholar from '../../../../models/Scholar.js';
import ScholarOptions from '../../../../models/ScholarOptions.js';
import { requireAdmin } from '../../../../lib/auth.js';
import { ApiError, handleApiError } from '../../../../lib/apiError.js';

export const runtime = 'nodejs';

async function buildOptions() {
  const stored = await ScholarOptions.getSingleton();
  const [distinctYears, distinctCategories] = await Promise.all([
    Scholar.distinct('year'),
    Scholar.distinct('category'),
  ]);

  const years = [...new Set([...stored.years, ...distinctYears])].sort((a, b) => b - a);
  const categories = [...new Set([...stored.categories, ...distinctCategories.filter(Boolean)])].sort((a, b) =>
    a.localeCompare(b)
  );

  return { years, categories };
}

export async function GET() {
  try {
    await connectDB();
    const options = await buildOptions();
    return NextResponse.json(options);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    requireAdmin(request);
    await connectDB();

    const { type, value } = await request.json();
    if (!['year', 'category'].includes(type) || value === undefined || value === null || value === '') {
      throw new ApiError(400, 'A valid type (year or category) and value are required.');
    }

    const stored = await ScholarOptions.getSingleton();

    if (type === 'year') {
      const year = Number(value);
      if (!Number.isFinite(year)) {
        throw new ApiError(400, 'Year must be a number.');
      }
      if (!stored.years.includes(year)) {
        stored.years.push(year);
        await stored.save();
      }
    } else {
      const category = String(value).trim();
      if (!category) {
        throw new ApiError(400, 'Category cannot be empty.');
      }
      if (!stored.categories.includes(category)) {
        stored.categories.push(category);
        await stored.save();
      }
    }

    const options = await buildOptions();
    return NextResponse.json(options, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
