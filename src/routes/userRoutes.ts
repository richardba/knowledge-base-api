import { Router } from 'express';
import { createUser, getAllUsers, getUserById } from '../services/userService';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    res.status(400).json({ error: 'Missing required fields: name, email, or role' });
    return;
  }

  const user = createUser(name, email, role);
  res.status(201).json(user);
});

router.get('/', (_req, res) => {
  res.json(getAllUsers());
});

router.get('/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
     res.status(404).json({ error: 'User not found' });
     return;
  }
  res.json(user);
});

export default router;
