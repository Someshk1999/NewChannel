import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById } from '../services/api';
import type { NewsItem } from '../types';
import Loading from '../components/Loading';

const NewsDetailsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;
      setLoading(true);
      setError('');

      try {
        const response = await getNewsById(id);
        setArticle(response.data);
      } catch (err) {
        setError('Could not load the requested news article.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">{error}</div>;
  }

  if (!article) {
    return <div className="rounded-3xl bg-slate-50 p-6 text-slate-500 shadow-sm">Article not found.</div>;
  }

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <img src={article.imageUrl} alt={article.title} className="mb-6 h-72 w-full rounded-3xl object-cover" />
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900">{article.title}</h1>
        <p className="text-sm text-slate-500">Published on {new Date(article.createdAt).toLocaleDateString()}</p>
        <p className="text-lg leading-8 text-slate-700">{article.content}</p>
      </div>
    </article>
  );
};

export default NewsDetailsPage;
