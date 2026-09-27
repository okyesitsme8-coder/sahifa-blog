export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  content: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTimeMinutes: number;
  isFeatured?: boolean;
  status: 'published' | 'draft';
  claps: number;
  views: number;
  comments: BlogComment[];
  isRtl?: boolean;
}

export type ViewMode = 'feed' | 'read' | 'write' | 'bookmarks';

export interface AdSettings {
  enabled: boolean;
  mode: 'graphic' | 'wireframe';
  showLeaderboard: boolean;
  showSidebar: boolean;
  showInFeed: boolean;
  showInArticle: boolean;
}
