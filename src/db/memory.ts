import { Topic } from '../models/Topic';
import { Resource } from '../models/Resource';
import { User } from '../models/User';
import { TopicVersion } from '../models/TopicVersion';

export const db = {
  users: new Map<string, User>(),
  topics: new Map<string, Topic>(),
  topicVersions: new Map<string, TopicVersion[]>(),
  resources: new Map<string, Resource>()
};
