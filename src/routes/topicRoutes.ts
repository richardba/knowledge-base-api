import { Router } from 'express';
import {
  createTopic,
  deleteTopic,
  getAllTopics,
  getTopicById,
  getTopicVersions,
  restoreTopicVersion,
  updateTopic,
  findShortestPathBetweenTopics,
  getSubtopics,
  getTopicTree
} from '../services/topicService';

const router = Router();

router.get('/', (_req, res) => {
  const topics = getAllTopics();
  res.json(topics);
});

router.post('/', (req, res) => {
  const { name, content, parentTopicId } = req.body;

  if (!name || !content) {
    res.status(400).json({ error: 'Missing required fields: name or content' });
    return;
  }

  const topic = createTopic(name, content, parentTopicId);
  res.status(201).json(topic);
})

router.get('/:id', (req, res) => {
  const topic = getTopicById(req.params.id);
  if (!topic) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  
  res.json(topic);
  return;
});

router.put('/:id', (req, res) => {
  const topic = updateTopic(req.params.id, req.body.name, req.body.content);
  if (!topic) {
    res.status(404).json({ error: 'Topic not found' });
    return;
  }
  res.json(topic);
});

router.delete('/:id', (req, res) => {
  const success = deleteTopic(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Topic not found' });
    return;
  }
  res.status(204).send();
});

router.get('/:id/versions', (req, res) => {
  const versions = getTopicVersions(req.params.id);
  res.json(versions);
});

router.post('/:id/restore/:version', (req, res) => {
  const { id, version } = req.params;
  const restored = restoreTopicVersion(id, parseInt(version));
  if (!restored) {
    res.status(404).json({ error: 'Version not found' });
    return;
  }
  res.json(restored);
});

router.get('/path/:fromId/:toId', (req, res) => {
  const { fromId, toId } = req.params;
  const path = findShortestPathBetweenTopics(fromId, toId);

  if (!path) {
    res.status(404).json({ error: 'No path found between the topics' });
    return
  }

  res.json(path);
});

router.get('/:id/children', (req, res) => {
  const { id } = req.params;
  const children = getSubtopics(id);
  res.json(children);
});

router.get('/:id/tree', (req, res) => {
  const tree = getTopicTree(req.params.id);
  if (!tree) {
    res.status(404).json({ error: 'Topic not found' });
    return;
  }
  res.json(tree);
});

export default router;
