import express from 'express';
import authRoutes from './routes/auth';
import taskRoutes from './routes/task';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Apply JSON middleware
app.use(express.json());

// Apply rate limiting to all requests to prevent abuse
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 100              // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/', (_req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
