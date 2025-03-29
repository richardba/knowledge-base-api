import request from 'supertest';
import app from '../../app';
import { db } from '../../db/memory';

describe('Topic Routes', () => {
  beforeEach(() => {
    db.topics.clear();
    db.topicVersions.clear();
  });

  it('POST /topics - creates a new topic', async () => {
    const res = await request(app).post('/topics').send({
      name: 'New Topic',
      content: 'Learning Express',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('New Topic');
  });

  it('GET /topics - returns all topics', async () => {
    await request(app).post('/topics').send({ name: 'One', content: '1' });
    await request(app).post('/topics').send({ name: 'Two', content: '2' });

    const res = await request(app).get('/topics');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('GET /topics/:id - gets a topic by ID', async () => {
    const { body } = await request(app).post('/topics').send({
      name: 'Single',
      content: 'Unique',
    });

    const res = await request(app).get(`/topics/${body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Single');
  });

  it('PUT /topics/:id - updates a topic', async () => {
    const { body } = await request(app).post('/topics').send({
      name: 'Updatable',
      content: 'Before',
    });

    const res = await request(app).put(`/topics/${body.id}`).send({
      name: 'Updated',
      content: 'After',
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated');
  });

  it('GET /topics/:id/versions - lists versions', async () => {
    const { body } = await request(app).post('/topics').send({
      name: 'Versioned',
      content: 'Start',
    });

    await request(app).put(`/topics/${body.id}`).send({
      name: 'Edited',
    });

    const res = await request(app).get(`/topics/${body.id}/versions`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('POST /topics/:id/restore/:version - restores a version', async () => {
    const { body } = await request(app).post('/topics').send({
      name: 'Restorable',
      content: 'Initial',
    });

    await request(app).put(`/topics/${body.id}`).send({
      name: 'Changed',
      content: 'New Content',
    });

    const res = await request(app).post(`/topics/${body.id}/restore/1`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Restorable');
  });

  it('DELETE /topics/:id - deletes a topic', async () => {
    const { body } = await request(app).post('/topics').send({
      name: 'ToDelete',
      content: 'Bye',
    });

    const res = await request(app).delete(`/topics/${body.id}`);
    expect(res.status).toBe(204);

    const followUp = await request(app).get(`/topics/${body.id}`);
    expect(followUp.status).toBe(404);
  });
});
