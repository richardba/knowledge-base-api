import { createUser, getAllUsers, getUserById } from '../userService';
import { db } from '../../db/memory';

describe('User Service', () => {
  beforeEach(() => {
    db.users.clear();
  });

  it('should create a user', () => {
    const user = createUser('Alice', 'alice@example.com', 'Editor');

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.role).toBe('Editor');

    const stored = db.users.get(user.id);
    expect(stored).toEqual(user);
  });

  it('should get all users', () => {
    createUser('A', 'a@example.com', 'Admin');
    createUser('B', 'b@example.com', 'Viewer');

    const users = getAllUsers();
    expect(users.length).toBe(2);
  });

  it('should get a user by ID', () => {
    const user = createUser('C', 'c@example.com', 'Admin');

    const found = getUserById(user.id);
    expect(found).toBeDefined();
    expect(found?.name).toBe('C');
  });

  it('should return undefined for non-existent user ID', () => {
    const result = getUserById('not-an-id');
    expect(result).toBeUndefined();
  });
});
