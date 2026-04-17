import { useEffect, useState } from 'react';
import { getNews, createNews, updateNews, deleteNews } from '../services/api';
import type { NewsItem } from '../types';
import Loading from '../components/Loading';

const initialForm = {
  title: '',
  description: '',
  content: '',
  imageUrl: '',
};

const AdminDashboard = () => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadNews = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getNews('', 1, 20);
      setArticles(response.data.news);
    } catch (err) {
      setError('Unable to load admin news list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    loadNews();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage('');
  };

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    if (!form.title.trim() || !form.description.trim() || !form.content.trim() || !form.imageUrl.trim()) {
      setError('Please fill all fields before submitting.');
      setSaving(false);
      return;
    }

    try {
      if (editingId) {
        await updateNews(editingId, form);
        setMessage('Article updated successfully.');
      } else {
        await createNews(form);
        setMessage('Article added successfully.');
      }

      resetForm();
      loadNews();
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.response?.data?.message || 'Unable to save article.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (article: NewsItem) => {
    setEditingId(article._id);
    setForm({
      title: article.title,
      description: article.description,
      content: article.content,
      imageUrl: article.imageUrl,
    });
    setMessage('You are editing an existing article.');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this article?')) return;
    setSaving(true);
    setError('');

    try {
      await deleteNews(id);
      setMessage('Article deleted successfully.');
      loadNews();
    } catch (err: any) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Unable to delete article.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
          <p className="mt-1 text-slate-600">Create, edit, and delete news articles from one place.</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Create or edit article</h2>
        <p className="mt-1 text-slate-600">Fill the form below and save your changes.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
            <input
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              placeholder="Write a strong headline"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Short Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              rows={3}
              placeholder="Write a short description"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              rows={5}
              placeholder="Write the full article content"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Image URL</label>
            <input
              value={form.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {message && <p className="text-sm text-slate-600">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {editingId ? 'Update Article' : 'Create Article'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-700 transition hover:bg-slate-50"
            >
              Reset Form
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Manage Articles</h2>
            <p className="mt-1 text-slate-600">Edit or remove news articles from the list.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {articles.length} articles
          </span>
        </div>

        {loading ? (
          <div className="mt-6"><Loading /></div>
        ) : (
          <div className="mt-6 space-y-4">
            {articles.map((article) => (
              <div
                key={article._id}
                className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{article.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{article.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(article)}
                    className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(article._id)}
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
