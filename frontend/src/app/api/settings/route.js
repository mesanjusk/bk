import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb.js';
import SiteSettings from '../../../models/SiteSettings.js';
import { requireAdmin } from '../../../lib/auth.js';
import { handleApiError } from '../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.getSingleton();
    return NextResponse.json(settings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request) {
  try {
    requireAdmin(request);
    await connectDB();

    const { heroMediaType, heroMediaUrl } = await request.json();
    const settings = await SiteSettings.getSingleton();

    if (heroMediaType !== undefined) settings.heroMediaType = heroMediaType;
    if (heroMediaUrl !== undefined) settings.heroMediaUrl = heroMediaUrl;

    await settings.save();
    return NextResponse.json(settings);
  } catch (error) {
    return handleApiError(error);
  }
}
