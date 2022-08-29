export interface Post {
  url: string;
  draft: boolean;
  title: string;
  description?: string;
  tags?: string[];
  date: string;
  readingTime: string;
}
