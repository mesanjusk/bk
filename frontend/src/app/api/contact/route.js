import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb.js';
import ContactMessage from '../../../models/ContactMessage.js';
import { ApiError, handleApiError } from '../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      throw new ApiError(400, 'Name, email and message are required.');
    }

    const contactMessage = await ContactMessage.create({ name, email, message });
    return NextResponse.json({ success: true, id: contactMessage._id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
