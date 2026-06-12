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
    <section className="mx-auto max-w-xl rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-purple-50/30 to-amber-50/30 p-6 sm:p-8 shadow-sm">
      <div className="space-y-2">
        <div className="text-3xl sm:text-4xl">ॐ</div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-900">Admin Access</h2>
        <p className="text-sm sm:text-base text-purple-600">Administrators only - manage divine teachings</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-purple-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl sm:rounded-2xl border border-purple-300 bg-purple-50/50 px-4 py-3 text-sm sm:text-base transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-purple-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl sm:rounded-2xl border border-purple-300 bg-purple-50/50 px-4 py-3 text-sm sm:text-base transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
            required
          />
        </div>

        {error && <p className="text-xs sm:text-sm text-red-600 bg-red-50 rounded-lg p-2 sm:p-3">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-purple-600 to-amber-600 px-5 py-3 text-white text-sm sm:text-base font-medium transition hover:shadow-lg hover:shadow-purple-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? '🔄 Signing in...' : '✨ Sign In'}
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
