import { useEffect, useState } from 'react';
import { getNews } from '../services/api';
import type { NewsItem } from '../types';
import NewsCard from '../components/NewsCard';
import Loading from '../components/Loading';

const HomePage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getNews(search, page, 9);
        setNews(response.data.news);
        setTotalItems(response.data.totalItems);
      } catch (err) {
        setError('Unable to load articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [search, page]);

  const totalPages = Math.ceil(totalItems / 8) || 1;

  return (
    <div className="space-y-4 sm:space-y-8">
      <section className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-purple-900 via-purple-700 to-amber-600 px-4 sm:px-6 py-6 sm:py-10 shadow-2xl shadow-purple-900/30 text-white animate-fade-in">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80"
            alt="Spiritual meditation background"
            className="h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-purple-950/75" />
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-amber-400/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-amber-100 shadow-sm shadow-amber-400/20 animate-pulse">
              ✨ Divine Teachings
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">Find peace and wisdom in spiritual devotion</h1>
              <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-purple-100">
                Discover sacred teachings, devotional stories, and spiritual wisdom curated to guide your journey.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teachings..."
                className="w-full rounded-2xl border border-amber-300/30 bg-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-purple-200 shadow-lg shadow-purple-900/10 transition duration-300 focus:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
              />
              <p className="text-xs sm:text-sm font-medium text-purple-100">Page {page} of {totalPages}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white/5 shadow-2xl shadow-purple-950/30 animate-float hidden sm:block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUmr2-fId8aA1cBBsW7u0JlvI1tWCAaYi5wg&s"
              alt="Spiritual devotion visualization"
              className="h-64 sm:h-72 w-full object-cover transition duration-500 hover:scale-110"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-950/95 via-purple-950/20 to-transparent px-4 sm:px-6 py-4 sm:py-5">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Sacred Wisdom</p>
              <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold text-white">Experience the divine path</h2>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="rounded-2xl sm:rounded-3xl bg-red-50 p-4 sm:p-6 text-sm sm:text-base text-red-700 shadow-sm">{error}</div>
      ) : (
        <section className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-b from-purple-100/50 to-amber-100/50 p-4 sm:p-6 shadow-2xl shadow-purple-900/10 animate-fade-in">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1600&q=80"
              alt="Spiritual background"
              className="h-full w-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-amber-100/50" />
          </div>
          <div className="relative z-10 grid gap-4 sm:gap-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-[2rem] bg-gradient-to-r from-purple-900 to-amber-700 px-4 sm:px-6 py-4 sm:py-5 shadow-2xl shadow-purple-900/30 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs sm:text-sm font-medium text-purple-100">Page {page} of {totalPages}</p>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex-1 sm:flex-none rounded-full bg-amber-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-purple-900 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-purple-700 disabled:text-purple-400"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="flex-1 sm:flex-none rounded-full bg-amber-300 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-purple-900 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-purple-700 disabled:text-purple-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
