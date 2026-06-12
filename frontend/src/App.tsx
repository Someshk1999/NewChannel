import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-purple-50 to-amber-50">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 shadow-xl shadow-purple-900/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-3 py-3 sm:px-6 sm:py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-semibold tracking-tight text-white transition duration-300 hover:scale-[1.03]"
          >
            <span className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-amber-400/30 text-xs sm:text-sm font-bold text-amber-200 ring-1 ring-amber-300/50">
              ॐ
            </span>
            <span className="hidden xs:inline">Divine Voice</span>
            <span className="inline xs:hidden">DV</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-white">
            <Link
              to="/"
              className="rounded-full px-3 sm:px-4 py-2 transition duration-300 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="rounded-full px-3 sm:px-4 py-2 transition duration-300 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-3 sm:px-6 py-4 sm:py-8">
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
