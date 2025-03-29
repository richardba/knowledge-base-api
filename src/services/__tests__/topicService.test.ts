import {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  getTopicVersions,
  restoreTopicVersion,
} from '../topicService';
import { db } from '../../db/memory';

describe('Topic Service', () => {
  beforeEach(() => {
    db.topics.clear();
    db.topicVersions.clear();
  });

  it('should create a topic', () => {
    const topic = createTopic('Test Topic', 'This is content');

    expect(topic).toHaveProperty('id');
    expect(topic.name).toBe('Test Topic');
    expect(topic.version).toBe(1);

    const stored = db.topics.get(topic.id);
    expect(stored).toEqual(topic);
  });

  it('should retrieve all topics', () => {
    createTopic('Topic 1', 'Content 1');
    createTopic('Topic 2', 'Content 2');

    const topics = getAllTopics();
    expect(topics.length).toBe(2);
  });

  it('should retrieve a topic by ID', () => {
    const topic = createTopic('Topic A', 'A content');
    const found = getTopicById(topic.id);

    expect(found).toBeDefined();
    expect(found?.name).toBe('Topic A');
  });

  it('should update a topic and store version', () => {
    const topic = createTopic('Original', 'Old content');

    const updated = updateTopic(topic.id, 'Updated', 'New content');
    expect(updated?.name).toBe('Updated');
    expect(updated?.version).toBe(2);

    const versions = getTopicVersions(topic.id);
    expect(versions.length).toBe(2);
  });

  it('should delete a topic and its versions', () => {
    const topic = createTopic('Delete Me', 'Gone');
    const deleted = deleteTopic(topic.id);

    expect(deleted).toBe(true);
    expect(getTopicById(topic.id)).toBeUndefined();
    expect(getTopicVersions(topic.id).length).toBe(0);
  });

  it('should restore a topic from a previous version', () => {
    const topic = createTopic('Step 1', 'Initial');
    updateTopic(topic.id, 'Step 2', 'Middle');
    updateTopic(topic.id, 'Step 3', 'Final');

    const restored = restoreTopicVersion(topic.id, 1);
    expect(restored?.name).toBe('Step 1');
    expect(restored?.version).toBe(4); // 3 versions + 1 restore = version 4
  });
});
