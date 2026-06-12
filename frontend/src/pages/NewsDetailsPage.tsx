import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    return <div className="rounded-2xl sm:rounded-3xl bg-red-50 p-4 sm:p-6 text-sm sm:text-base text-red-700 shadow-sm">{error}</div>;
  }

  if (!article) {
    return <div className="rounded-2xl sm:rounded-3xl bg-purple-50 p-4 sm:p-6 text-sm sm:text-base text-purple-500 shadow-sm">Article not found.</div>;
  }

  return (
    <article className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-purple-50/30 to-amber-50/30 p-4 sm:p-6 shadow-lg sm:shadow-sm overflow-hidden">
      <img
        src={article.imageUrl}
        alt={article.title}
        loading="eager"
        className="mb-4 sm:mb-6 h-56 xs:h-64 sm:h-72 w-full rounded-2xl sm:rounded-3xl object-cover shadow-md"
      />
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-semibold text-purple-900 leading-tight">{article.title}</h1>
          <p className="text-xs sm:text-sm text-purple-500 mt-2 sm:mt-3">Published on {new Date(article.createdAt).toLocaleDateString()} • ✨ Sacred Wisdom</p>
        </div>
        <div className="w-full h-0.5 bg-gradient-to-r from-purple-300 via-amber-300 to-transparent rounded-full" />
        <p className="text-sm xs:text-base sm:text-lg leading-7 sm:leading-8 text-purple-800 whitespace-pre-wrap break-words">{article.content}</p>
        <div className="mt-6 sm:mt-8 pt-6 border-t border-purple-200/40">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-amber-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition hover:shadow-lg hover:shadow-purple-600/30 active:scale-95"
          >
            ← Back to Teachings
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsDetailsPage;
