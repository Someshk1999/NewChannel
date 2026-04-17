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
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-700 to-cyan-500 px-6 py-10 shadow-2xl shadow-slate-900/20 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
            alt="Breaking news background"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100 shadow-sm shadow-white/10">
              Latest News
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">Stay in the loop with breaking stories</h1>
              <p className="mt-3 max-w-2xl text-slate-200">
                Browse the latest updates from the newsroom, curated for easy reading and fast discovery.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stories..."
                className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-200 shadow-lg shadow-slate-900/10 transition duration-300 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 sm:w-80"
              />
              <p className="text-sm font-medium text-slate-200">Page {page} of {totalPages}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl shadow-slate-950/20">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
              alt="Breaking news visualization"
              className="h-72 w-full object-cover transition duration-500 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent px-6 py-5">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Headline feature</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Trusted coverage for every story</h2>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="rounded-3xl bg-red-50 p-6 text-red-700 shadow-sm">{error}</div>
      ) : (
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-50/90 p-6 shadow-2xl shadow-slate-900/10">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=80"
              alt="News background"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-slate-50/90" />
          </div>
          <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {news.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-4 rounded-[2rem] bg-slate-950/90 px-6 py-5 shadow-2xl shadow-slate-900/20 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">Page {page} of {totalPages}</p>
        <div className="flex gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="rounded-full bg-slate-100 px-5 py-2 text-sm font-medium text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
