import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navigation = [
  { to: '/books', label: 'Books', icon: 'bi-journal-bookmark' },
  { to: '/issue', label: 'Issue a book', icon: 'bi-arrow-left-right' },
  { to: '/members', label: 'Members', icon: 'bi-people' },
  { to: '/history', label: 'Borrow history', icon: 'bi-clock-history' },
];

export function Layout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/books" className="brand" aria-label="ShelfLife home">
          <span className="brand-mark" aria-hidden="true"><i className="bi bi-book-half" /></span>
          <span>ShelfLife<span className="brand-period">.</span></span>
        </NavLink>

        <div className="sidebar-section-label">Library desk</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>
              <i className={`bi ${icon}`} aria-hidden="true" />
              <span>{label}</span>
              {to === '/books' && <i className="bi bi-chevron-right nav-chevron" aria-hidden="true" />}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="desk-status"><span className="status-dot" /> Desk is ready</div>
          <div className="profile-chip">
            <span className="profile-avatar"><i className="bi bi-person" aria-hidden="true" /></span>
            <span><strong>Library staff</strong><small>Administrator</small></span>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-label"><span>OPERATIONS</span><i className="bi bi-chevron-right" aria-hidden="true" /><strong>Library desk</strong></div>
          <div className="topbar-actions">
            <button
              type="button"
              className="icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'}`} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-quiet btn-small" onClick={logout}>
              <i className="bi bi-box-arrow-right" aria-hidden="true" /> <span>Sign out</span>
            </button>
          </div>
        </header>
        <main className="container"><Outlet /></main>
        <footer className="app-footer"><span>ShelfLife Library System</span><span>Thoughtfully kept, one book at a time.</span></footer>
      </div>
    </div>
  );
}
