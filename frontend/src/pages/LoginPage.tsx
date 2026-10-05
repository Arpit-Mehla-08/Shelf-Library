import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getErrorMessage } from '../utils/format';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/books';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) return <Navigate to={from} replace />;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-shell">
      <aside className="login-art" aria-hidden="true">
        <div className="login-art-brand"><span className="brand-mark"><i className="bi bi-book-half" /></span> ShelfLife<span className="brand-period">.</span></div>
        <div className="shelf-illustration">
          <div className="book-spines"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="shelf-line" />
          <div className="book-spines lower"><span /><span /><span /><span /><span /><span /></div>
          <div className="shelf-line lower-line" />
          <div className="plant-pot"><i className="bi bi-flower1" /></div>
        </div>
        <div className="login-art-caption"><span>EST. FOR STORY KEEPERS</span><strong>Every story<br />has a place.</strong></div>
        <span className="login-art-foot">A little order for a world of stories.</span>
      </aside>

      <main className="login-main">
        <button type="button" className="icon-button login-theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'}`} aria-hidden="true" />
        </button>
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-mobile-brand brand"><span className="brand-mark"><i className="bi bi-book-half" /></span> ShelfLife<span className="brand-period">.</span></div>
          <span className="eyebrow">STAFF ACCESS</span>
          <h1>Welcome back</h1>
          <p className="muted">Sign in to your library desk.</p>

          <div className="field">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon"><i className="bi bi-person" aria-hidden="true" /><input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus autoComplete="username" /></div>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon"><i className="bi bi-lock" aria-hidden="true" /><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></div>
          </div>

          {error && <div className="error-box" role="alert"><i className="bi bi-exclamation-circle" aria-hidden="true" />{error}</div>}

          <button type="submit" className="btn login-submit" disabled={submitting}>
            <span>{submitting ? 'Signing in...' : 'Sign in'}</span><i className="bi bi-arrow-right" aria-hidden="true" />
          </button>
          <div className="login-secure"><i className="bi bi-shield-lock" aria-hidden="true" /> Secure librarian access</div>
        </form>
      </main>
    </div>
  );
}
