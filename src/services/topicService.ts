import { db } from '../db/memory';
import { Topic } from '../models/Topic';
import { v4 as uuidv4 } from 'uuid';
import { TopicVersion } from '../models/TopicVersion';

export const createTopic = (name: string, content: string, parentTopicId?: string): Topic => {
  const now = new Date();
  const topic: Topic = {
    id: uuidv4(),
    name,
    content,
    createdAt: now,
    updatedAt: now,
    version: 1,
    parentTopicId,
  };

  db.topics.set(topic.id, topic);
  db.topicVersions.set(topic.id, [
    {
      id: uuidv4(),
      topicId: topic.id,
      name,
      content,
      version: 1,
      createdAt: now,
    }
  ]);
  return topic;
};

export const updateTopic = (id: string, name?: string, content?: string): Topic | null => {
  const topic = db.topics.get(id);
  if (!topic) return null;

  // Save previous version
  const versions = db.topicVersions.get(id) || [];
  const newVersionNumber = topic.version + 1;

  versions.push({
    id: uuidv4(),
    topicId: id,
    name: topic.name,
    content: topic.content,
    version: newVersionNumber,
    createdAt: new Date(),
  });

  // Update topic
  topic.name = name ?? topic.name;
  topic.content = content ?? topic.content;
  topic.version = newVersionNumber;
  topic.updatedAt = new Date();

  db.topics.set(id, topic);
  db.topicVersions.set(id, versions);

  return topic;
};

export const getAllTopics = (): Topic[] => {
  return Array.from(db.topics.values());
};

export const getTopicById = (id: string): Topic | undefined => {
  return db.topics.get(id);
};

export const deleteTopic = (id: string): boolean => {
  const exists = db.topics.delete(id);
  db.topicVersions.delete(id);
  return exists;
};

export const getTopicVersions = (topicId: string): TopicVersion[] => {
  return db.topicVersions.get(topicId) || [];
};

export const restoreTopicVersion = (topicId: string, versionNumber: number): Topic | null => {
  const versions = db.topicVersions.get(topicId);
  if (!versions) return null;

  const version = versions.find(v => v.version === versionNumber);
  if (!version) return null;

  return updateTopic(topicId, version.name, version.content);
};

export const findShortestPathBetweenTopics = (startId: string, endId: string): Topic[] | null => {
  if (startId === endId) return [db.topics.get(startId)!];

  const visited = new Set<string>();
  const queue: { id: string; path: string[] }[] = [{ id: startId, path: [startId] }];

  while (queue.length > 0) {
    const { id, path } = queue.shift()!;
    visited.add(id);

    const currentTopic = db.topics.get(id);
    if (!currentTopic) continue;

    const neighbors: string[] = [];

    // Parent (go upward)
    if (currentTopic.parentTopicId) {
      neighbors.push(currentTopic.parentTopicId);
    }

    // Children (go downward)
    for (const topic of db.topics.values()) {
      if (topic.parentTopicId === id) {
        neighbors.push(topic.id);
      }
    }

    for (const neighborId of neighbors) {
      if (visited.has(neighborId)) continue;

      const newPath = [...path, neighborId];
      if (neighborId === endId) {
        return newPath.map(id => db.topics.get(id)!);
      }

      queue.push({ id: neighborId, path: newPath });
    }
  }

  return null; // No path found
};

export const getSubtopics = (topicId: string): Topic[] => {
  return Array.from(db.topics.values()).filter(
    topic => topic.parentTopicId === topicId
  );
};

export const getTopicTree = (topicId: string): any => {
  const topic = db.topics.get(topicId);
  if (!topic) return null;

  const children = getSubtopics(topicId).map(child => getTopicTree(child.id));

  return {
    ...topic,
    children
  };
};

