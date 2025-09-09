import { Router } from 'express';
import { register, login, refreshToken } from '../controllers/authController';

const router = Router();

/**
 * Route to register a new user. Accepts email and password in the request body.
 */
router.post('/register', register);

/**
 * Route to authenticate a user. Returns an access token and refresh token.
 */
router.post('/login', login);

/**
 * Route to refresh an access token using a valid refresh token.
 */
router.post('/refresh', refreshToken);

export default router;
