import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '7d';

/**
 * Register a new user.
 * Expects JSON body with `email` and `password` fields.
 */
export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: 'Email is already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  return res.status(201).json({ id: user.id, email: user.email });
}

/**
 * Log in a user and return an access token and refresh token.
 * Expects JSON body with `email` and `password` fields.
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  ifimport { Request, Response } from 'express';
import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '7d';

/**
 * Register a new user.
 * Expects JSON body with `email` and `password` fields.
 */
export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: 'Email is already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  return res.status(201).json({ id: user.id, email: user.email });
}

/**
 * Log in a user and return an access token and refresh token.
 * Expects JSON body with `email` and `password` fields.
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refresh = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
  return res.json({ token, refresh });
}

/**
 * Refresh the access token using a valid refresh token.
 * Expects JSON body with `refresh` field containing the refresh token.
 */
export async function refreshToken(req: Request, res: Response) {
  const { refresh } = req.body;
  if (!refresh) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }
  try {
    const decoded = jwt.verify(refresh, REFRESH_SECRET) as { id: number };
    const token = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
}
 (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refresh = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
  return res.json({ token, refresh });
}

/**
 * Refresh the access token using a valid refresh token.
 * Expects JSON body with `refresh` field containing the refresh token.
 */
export async function refreshToken(req: Request, res: Response) {
  const { refresh } = req.body;
  if (!refresh) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }
  try {
    const decoded = jwt.verify(refresh, REFRESH_SECRET) as { id: number };
    const token = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
}
