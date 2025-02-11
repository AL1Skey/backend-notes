import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.configDotenv();
export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};