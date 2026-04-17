export type NewsItem = {
  _id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: string;
};

export type NewsResponse = {
  news: NewsItem[];
  totalItems: number;
  page: number;
  limit: number;
};
