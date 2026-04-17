import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAdmin(username, password);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Admin Login</h2>
      <p className="mt-2 text-slate-600">Only administrators can access the dashboard.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
