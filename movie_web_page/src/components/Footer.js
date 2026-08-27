import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#050814] border-t border-white/10 text-white">

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP SECTION ================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-10
            lg:gap-16
            py-10
            sm:py-12
          "
        >

          {/* ================= BRAND ================= */}

          <div className="text-center sm:text-left">

            <Link
              to="/movies"
              className="
                inline-block
                text-2xl
                sm:text-3xl
                font-bold
                hover:scale-105
                transition-transform
                duration-300
              "
            >
              <span className="text-white">
                Movie
              </span>

              <span className="text-cyan-400">
                App
              </span>
            </Link>


            <p
              className="
                mt-4
                text-gray-500
                text-sm
                leading-6
                max-w-sm
                mx-auto
                sm:mx-0
              "
            >
              My first React project using the TMDB API.
              Built to learn React, API integration and
              modern frontend development.
            </p>

          </div>


          {/* ================= NAVIGATION ================= */}

          <div className="text-center sm:text-left">

            <h3
              className="
                text-white
                text-lg
                font-semibold
                mb-4
              "
            >
              Navigation
            </h3>


            <div
              className="
                flex
                flex-col
                items-center
                sm:items-start
                gap-3
              "
            >

              <Link
                to="/movies"
                className="
                  text-gray-400
                  hover:text-cyan-400
                  hover:translate-x-1
                  transition-all
                  duration-300
                "
              >
                Home
              </Link>


              <Link
                to="/favorites"
                className="
                  text-gray-400
                  hover:text-cyan-400
                  hover:translate-x-1
                  transition-all
                  duration-300
                "
              >
                Favorites
              </Link>


              <Link
                to="/about"
                className="
                  text-gray-400
                  hover:text-cyan-400
                  hover:translate-x-1
                  transition-all
                  duration-300
                "
              >
                About
              </Link>

            </div>

          </div>


          {/* ================= SOCIAL LINKS ================= */}

          <div className="text-center sm:text-left">

            <h3
              className="
                text-white
                text-lg
                font-semibold
                mb-4
              "
            >
              Connect With Me
            </h3>


            <div
              className="
                flex
                flex-wrap
                justify-center
                sm:justify-start
                gap-3
              "
            >

              {/* GitHub */}

              <a
                href="https://github.com/PraveenKumar7545"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-5
                  py-2.5
                  rounded-lg
                  border
                  border-white/10
                  text-gray-300
                  text-sm
                  font-medium
                  hover:text-white
                  hover:border-cyan-400
                  hover:bg-cyan-400/10
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                GitHub
              </a>


              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/praveen7545/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-5
                  py-2.5
                  rounded-lg
                  border
                  border-white/10
                  text-gray-300
                  text-sm
                  font-medium
                  hover:text-blue-400
                  hover:border-blue-400
                  hover:bg-blue-400/10
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                LinkedIn
              </a>

            </div>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}

        <div className="border-t border-white/10">


          {/* ================= COPYRIGHT ================= */}

          <div
            className="
              py-5
              text-center
            "
          >

            <p className="text-gray-600 text-xs sm:text-sm">
              © 2026 Praveen. All Rights Reserved.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;