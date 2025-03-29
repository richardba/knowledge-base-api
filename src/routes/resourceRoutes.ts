import { Router } from 'express';
import { createResource, getResourcesByTopic } from '../services/resourceService';

const router = Router();

router.post('/', (req, res) => {
  const { topicId, url, description, type } = req.body;

  if (!topicId || !url || !description || !type) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const resource = createResource(topicId, url, description, type);
  res.status(201).json(resource);
  return;
});

router.get('/topic/:topicId', (req, res) => {
  const { topicId } = req.params;
  const resources = getResourcesByTopic(topicId);
  res.json(resources);
  return;
});

export default router;
