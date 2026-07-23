import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { ApiError, handleApiError } from '../../../../lib/apiError.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      throw new ApiError(400, 'Username and password are required.');
    }

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      throw new ApiError(401, 'Invalid username or password.');
    }

    const token = jwt.sign({ role: 'admin', username }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return NextResponse.json({ token });
  } catch (error) {
    return handleApiError(error);
  }
}
