import { NextResponse } from 'next/server';
import cloudinary from '../../../lib/cloudinary.js';
import { requireAdmin } from '../../../lib/auth.js';
import { ApiError, handleApiError } from '../../../lib/apiError.js';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB, generous enough for a short hero video

function uploadFromBuffer(buffer, resourceType) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mita-foundation', resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export async function POST(request) {
  try {
    requireAdmin(request);

    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      throw new ApiError(400, 'No file was provided.');
    }

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      throw new ApiError(400, 'Only image or video files are allowed.');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new ApiError(400, 'File is too large. Maximum size is 20MB.');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
    const result = await uploadFromBuffer(buffer, resourceType);

    return NextResponse.json({ url: result.secure_url, type: resourceType }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
