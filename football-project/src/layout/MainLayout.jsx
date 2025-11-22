import { NavLink, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/ThemeSlice";

export default function MainLayout() {
  const favoritesCount = useSelector(
    (state) => state.Favorites.favoriteTeams.length
  );
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.Theme);
  const isDark = mode === "dark";
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div
      data-bs-theme={isDark ? "dark" : "light"}
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "dark" : "light",
        color: isDark ? "#ffffff" : "#000000",
        transition: "all 0.3s ease",
      }}
    >
      <header>
        <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                TheFootBall
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/teams"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Popular Teams
                  </NavLink>
                  <NavLink
                    to="/TodaysMatches"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Today's Matches
                  </NavLink>
                  <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    My Favorites ({favoritesCount})
                  </NavLink>
                </div>
                <div className="ms-auto">
                  <button className="btn btn-outline-secondary" onClick={handleToggleTheme} title={isDark ? "Light Theme" : "Dark Theme"}> {isDark ? "☀️" : "🌙"}</button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main style={{ 
        backgroundColor: isDark ? "#121212" : "#ffffff",
        color: isDark ? "#ffffff" : "#000000"
      }}>
        <Outlet />
      </main>
      <footer className="d-flex justify-content-center" style={{
          backgroundColor: isDark ? "#121212" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000"
        }}>
        <p>&copy; 2025 Football Project</p>
      </footer>
    </div>
  );
}
