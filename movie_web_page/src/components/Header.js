import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const showSearch = location.pathname === "/movies";

  // =========================
  // Search
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Search box is empty!");
      return;
    }

    if (onSearch) {
      onSearch(query);
    }
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setMenuOpen(false);
    navigate("/");
  };

  // =========================
  // Close Mobile Menu
  // =========================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        bg-gradient-to-r
        from-[#0f172a]
        via-[#1e1b4b]
        to-[#0f172a]
        border-b
        border-cyan-500/30
        shadow-lg
        shadow-cyan-900/20
      "
    >

      {/* ================================= */}
      {/* MAIN NAVBAR */}
      {/* ================================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

        <div className="relative flex items-center justify-between min-h-[50px]">


          {/* ================================= */}
          {/* LOGO - LEFT */}
          {/* ================================= */}

          <div className="flex-shrink-0">

            <Link
              to="/movies"
              onClick={closeMenu}
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                tracking-tight
                hover:scale-105
                transition
                duration-300
              "
            >

              <span className="text-white">
                Movie
              </span>

              <span
                className="
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                App
              </span>

            </Link>

          </div>


          {/* ================================= */}
          {/* CENTER NAVIGATION */}
          {/* ================================= */}

          <nav
            className="
              hidden
              md:flex
              absolute
              left-1/2
              -translate-x-1/2
              items-center
              gap-10
            "
          >

            {/* HOME */}

            <Link
              to="/movies"
              className={`
                px-2
                py-2
                text-sm
                font-medium
                transition
                duration-300
                ${
                  location.pathname === "/movies"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-300 hover:text-cyan-300"
                }
              `}
            >
              Home
            </Link>


            {/* FAVORITES */}

            <Link
              to="/favorites"
              className={`
                px-2
                py-2
                text-sm
                font-medium
                transition
                duration-300
                ${
                  location.pathname === "/favorites"
                    ? "text-pink-400 border-b-2 border-pink-400"
                    : "text-gray-300 hover:text-pink-300"
                }
              `}
            >
              Favorites
            </Link>


            {/* ABOUT */}

            <Link
              to="/about"
              className={`
                px-2
                py-2
                text-sm
                font-medium
                transition
                duration-300
                ${
                  location.pathname === "/about"
                    ? "text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-300 hover:text-cyan-300"
                }
              `}
            >
              About
            </Link>

          </nav>


          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* SEARCH + LOGOUT */}
          {/* ================================= */}

          <div className="hidden md:flex items-center gap-4 ml-auto">

            {/* SEARCH */}

            {showSearch && (

              <form
                onSubmit={handleSearch}
                className="flex"
              >

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="
                    w-48
                    lg:w-56
                    px-4
                    py-2.5
                    rounded-l-lg
                    bg-white/5
                    border
                    border-cyan-500/30
                    text-white
                    placeholder-gray-500
                    outline-none
                    focus:border-cyan-400
                    focus:ring-1
                    focus:ring-cyan-400/40
                    transition
                  "
                />

                <button
                  type="submit"
                  className="
                    px-4
                    py-2.5
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    hover:from-cyan-400
                    hover:to-blue-500
                    rounded-r-lg
                    text-white
                    font-medium
                    transition
                  "
                >
                  Search
                </button>

              </form>

            )}


            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="
                px-4
                py-2
                rounded-lg
                border
                border-red-500/40
                text-red-400
                hover:text-white
                hover:bg-red-500
                hover:border-red-500
                transition
                duration-300
              "
            >
              Logout
            </button>

          </div>


          {/* ================================= */}
          {/* MOBILE RIGHT SIDE */}
          {/* ================================= */}

          <div className="flex md:hidden items-center gap-3">

            {/* MOBILE LOGOUT */}

            <button
              onClick={handleLogout}
              className="
                px-3
                py-1.5
                rounded-lg
                border
                border-red-500/40
                text-red-400
                hover:text-white
                hover:bg-red-500
                transition
                duration-300
                text-sm
              "
            >
              Logout
            </button>


            {/* HAMBURGER */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                w-10
                h-10
                flex
                flex-col
                items-center
                justify-center
                gap-1.5
                rounded-lg
                border
                border-white/10
                bg-white/5
                hover:bg-white/10
                transition
              "
              aria-label="Toggle menu"
            >

              <span
                className={`
                  block
                  w-5
                  h-0.5
                  bg-cyan-400
                  transition
                  duration-300
                  ${menuOpen ? "rotate-45 translate-y-2" : ""}
                `}
              ></span>

              <span
                className={`
                  block
                  w-5
                  h-0.5
                  bg-cyan-400
                  transition
                  duration-300
                  ${menuOpen ? "opacity-0" : ""}
                `}
              ></span>

              <span
                className={`
                  block
                  w-5
                  h-0.5
                  bg-cyan-400
                  transition
                  duration-300
                  ${menuOpen ? "-rotate-45 -translate-y-2" : ""}
                `}
              ></span>

            </button>

          </div>

        </div>


        {/* ================================= */}
        {/* MOBILE MENU */}
        {/* ================================= */}

        {menuOpen && (

          <div className="md:hidden mt-4 border-t border-white/10 pt-4">

            <nav className="flex flex-col gap-2">

              <Link
                to="/movies"
                onClick={closeMenu}
                className={`
                  px-4
                  py-3
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    location.pathname === "/movies"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-cyan-300"
                  }
                `}
              >
                🏠 Home
              </Link>


              <Link
                to="/favorites"
                onClick={closeMenu}
                className={`
                  px-4
                  py-3
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    location.pathname === "/favorites"
                      ? "bg-pink-500/10 text-pink-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-pink-300"
                  }
                `}
              >
                ❤️ Favorites
              </Link>


              <Link
                to="/about"
                onClick={closeMenu}
                className={`
                  px-4
                  py-3
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    location.pathname === "/about"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-cyan-300"
                  }
                `}
              >
                ℹ️ About
              </Link>

            </nav>

          </div>

        )}


        {/* ================================= */}
        {/* MOBILE SEARCH */}
        {/* ================================= */}

        {showSearch && (

          <form
            onSubmit={handleSearch}
            className="md:hidden flex mt-4"
          >

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="
                flex-1
                min-w-0
                px-4
                py-2.5
                rounded-l-lg
                bg-white/5
                border
                border-cyan-500/30
                text-white
                placeholder-gray-500
                outline-none
                focus:border-cyan-400
                transition
              "
            />

            <button
              type="submit"
              className="
                px-4
                py-2.5
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                hover:from-cyan-400
                hover:to-blue-500
                rounded-r-lg
                text-white
                font-medium
                transition
              "
            >
              Search
            </button>

          </form>

        )}

      </div>

    </header>
  );
}

export default Header;