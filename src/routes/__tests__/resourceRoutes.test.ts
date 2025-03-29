import request from 'supertest';
import app from '../../app';
import { db } from '../../db/memory';
import { createTopic } from '../../services/topicService';

describe('Resource Routes', () => {
  let topicId: string;

  beforeEach(() => {
    db.topics.clear();
    db.resources.clear();

    const topic = createTopic('For Resources', 'Testing');
    topicId = topic.id;
  });

  it('POST /resources - should create a resource', async () => {
    const res = await request(app).post('/resources').send({
      topicId,
      url: 'https://example.com/resource',
      description: 'A useful article',
      type: 'article',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.type).toBe('article');
  });

  it('GET /resources/topic/:topicId - returns resources for topic', async () => {
    await request(app).post('/resources').send({
      topicId,
      url: 'https://doc.com',
      description: 'Doc',
      type: 'pdf',
    });

    const res = await request(app).get(`/resources/topic/${topicId}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].type).toBe('pdf');
  });

  it('GET /resources/topic/:topicId - empty for topic with no resources', async () => {
    const anotherTopic = createTopic('Empty Topic', 'No resources');
    const res = await request(app).get(`/resources/topic/${anotherTopic.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /resources - fails with missing fields', async () => {
    const res = await request(app).post('/resources').send({
      topicId,
      description: 'Oops',
      type: 'video',
    });

    expect(res.status).toBe(400);
  });
});
