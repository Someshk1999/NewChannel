import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-sky-600 via-cyan-500 to-slate-900 shadow-xl shadow-slate-900/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight text-white transition duration-300 hover:scale-[1.03]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white ring-1 ring-white/30">
              N
            </span>
            News 18
          </Link>

          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-white">
            <Link
              to="/"
              className="rounded-full px-4 py-2 transition duration-300 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="rounded-full px-4 py-2 transition duration-300 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:id" element={<NewsDetailsPage />} />
          <Route
            path="/admin"
            element={<ProtectedRoute component={<AdminDashboard />} />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
