export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  type: 'text' | 'project' | 'question' | 'achievement';
  tags: string[];
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  createdAt: Date;
}

export interface CreatePostData {
  content: string;
  type: 'text' | 'project' | 'question' | 'achievement';
  tags: string[];
}
