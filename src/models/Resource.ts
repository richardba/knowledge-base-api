export type ResourceType = 'video' | 'article' | 'pdf';

export interface Resource {
  id: string;
  topicId: string;
  url: string;
  description: string;
  type: ResourceType;
  createdAt: Date;
  updatedAt: Date;
}
