import { Request, Response } from 'express';
import prisma from '../utils/prisma';

/**
 * Create a new task. The authenticated user ID is expected to be attached to the request.
 */
export async function createTask(req: Request, res: Response) {
  const { title, description, status } = req.body;
  const userId = (req as any).userId as number;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const task = await prisma.task.create({
    data: {
      title,
      description: description || '',
      status: status || 'TODO',
      userId
    }
  });
  return res.status(201).json(task);
}

/**
 * Get all tasks for the authenticated user.
 */
export async function getTasks(req: Request, res: Response) {
  const userId = (req as any).userId as number;
  const tasks = await prisma.task.findMany({ where: { userId } });
  return res.json(tasks);
}

/**
 * Get a single task by ID. Ensures the task belongs to the authenticated user.
 */
export async function getTask(req: Request, res: Response) {
  const userId = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  return res.json(task);
}

/**
 * Update an existing task. Ensures the task belongs to the authenticated user.
 */
export async function updateTask(req: Request, res: Response) {
  const userId = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);
  // Check that the task exists and belongs to the user
  const existing = await prisma.task.findFirst({ where: { id, userId } });
  if (!existing) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const { title, description, status } = req.body;
  const updated = await prisma.task.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      description: description ?? existing.description,
      status: status ?? existing.status
    }
  });
  return res.json(updated);
}

/**
 * Delete a task. Ensures the task belongs to the authenticated user.
 */
export async function deleteTask(req: Request, res: Response) {
  const userId = (req as any).userId as number;
  const id = parseInt(req.params.id, 10);
  const existing = await prisma.task.findFirst({ where: { id, userId } });
  if (!existing) {
    return res.status(404).json({ message: 'Task not found' });
  }
  await prisma.task.delete({ where: { id } });
  return res.json({ message: 'Task deleted' });
}
