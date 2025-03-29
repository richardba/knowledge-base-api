import { Resource, ResourceType } from '../models/Resource';
import { db } from '../db/memory';
import { v4 as uuidv4 } from 'uuid';

export const createResource = (
  topicId: string,
  url: string,
  description: string,
  type: ResourceType
): Resource => {
  const now = new Date();
  const resource: Resource = {
    id: uuidv4(),
    topicId,
    url,
    description,
    type,
    createdAt: now,
    updatedAt: now,
  };

  db.resources.set(resource.id, resource);
  return resource;
};

export const getResourcesByTopic = (topicId: string): Resource[] => {
  return Array.from(db.resources.values()).filter(r => r.topicId === topicId);
};
