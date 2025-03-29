import request from 'supertest';
import app from '../../app';
import { db } from '../../db/memory';

describe('User Routes', () => {
  beforeEach(() => {
    db.users.clear();
  });

  it('POST /users - creates a new user', async () => {
    const res = await request(app).post('/users').send({
      name: 'Editor User',
      email: 'editor@example.com',
      role: 'Editor'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.role).toBe('Editor');
  });

  it('GET /users - gets all users', async () => {
    await request(app).post('/users').send({
      name: 'Admin One',
      email: 'admin@example.com',
      role: 'Admin'
    });

    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('GET /users/:id - gets a specific user', async () => {
    const { body } = await request(app).post('/users').send({
      name: 'Viewer User',
      email: 'viewer@example.com',
      role: 'Viewer'
    });

    const res = await request(app).get(`/users/${body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Viewer User');
  });

  it('GET /users/:id - returns 404 for missing user', async () => {
    const res = await request(app).get('/users/does-not-exist');
    expect(res.status).toBe(404);
  });

  it('POST /users - returns 400 for missing fields', async () => {
    const res = await request(app).post('/users').send({
      name: 'No Role',
      email: 'norole@example.com'
    });

    expect(res.status).toBe(400);
  });
});
