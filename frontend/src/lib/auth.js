import jwt from 'jsonwebtoken';
import { ApiError } from './apiError.js';

export function requireAdmin(request) {
  const authHeader = request.headers.get('authorization') || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Authentication required.');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') {
      throw new ApiError(403, 'Admin access required.');
    }
    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, 'Invalid or expired token.');
  }
}
