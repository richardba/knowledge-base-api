import { db } from '../../db/memory';
import { createResource, getResourcesByTopic } from '../resourceService';
import { createTopic } from '../topicService';

describe('Resource Service', () => {
  let topicId: string;

  beforeEach(() => {
    db.topics.clear();
    db.resources.clear();

    const topic = createTopic('Test Topic', 'Resource linked');
    topicId = topic.id;
  });

  it('should create a resource for a topic', () => {
    const res = createResource(topicId, 'https://example.com', 'An article', 'article');

    expect(res).toHaveProperty('id');
    expect(res.topicId).toBe(topicId);
    expect(res.type).toBe('article');
    expect(db.resources.get(res.id)).toEqual(res);
  });

  it('should return all resources linked to a topic', () => {
    createResource(topicId, 'https://a.com', 'A', 'article');
    createResource(topicId, 'https://b.com', 'B', 'pdf');

    const resources = getResourcesByTopic(topicId);
    expect(resources.length).toBe(2);
    expect(resources[0].topicId).toBe(topicId);
  });

  it('should return empty array if topic has no resources', () => {
    const resources = getResourcesByTopic('nonexistent');
    expect(resources).toEqual([]);
  });
});
