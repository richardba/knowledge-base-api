import { db } from '../db/memory';
import { User, UserRole } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

export const createUser = (name: string, email: string, role: UserRole): User => {
  const user: User = {
    id: uuidv4(),
    name,
    email,
    role,
    createdAt: new Date(),
  };

  db.users.set(user.id, user);
  return user;
};

export const getAllUsers = (): User[] => {
  return Array.from(db.users.values());
};

export const getUserById = (id: string): User | undefined => {
  return db.users.get(id);
};
