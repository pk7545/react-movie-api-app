import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import profileImage from "../assets/Praveen_Kumar_M.jpeg";


function About() {

  const navigate = useNavigate();


  return (

    <div className="min-h-screen bg-[#0a0a1a] text-white">

      {/* ================= HEADER ================= */}

      <Header />


      {/* ================= MAIN ================= */}

      <main>


        {/* ================= HERO SECTION ================= */}

        <section className="relative py-20 px-4 overflow-hidden">

          {/* Background Glow */}

          <div
            className="
              absolute
              top-10
              left-1/2
              -translate-x-1/2
              w-80
              h-80
              bg-pink-500/20
              rounded-full
              blur-[120px]
            "
          ></div>


          <div className="relative max-w-5xl mx-auto text-center">


            {/* Small Heading */}

            <p className="
              text-pink-400
              uppercase
              tracking-[0.3em]
              text-sm
              font-semibold
              mb-5
            ">
              About Me
            </p>


            {/* Profile Image */}

            <div className="flex justify-center mb-7">

              <div className="relative">


                {/* Glow around image */}

                <div className="
                  absolute
                  -inset-1
                  rounded-full
                  bg-gradient-to-r
                  from-pink-400
                  via-purple-500
                  to-blue-500
                  blur-sm
                  opacity-80
                "></div>


                <img
                  src={profileImage}
                  alt="Praveen Kumar"
                  className="
                    relative
                    w-36
                    h-36
                    sm:w-44
                    sm:h-44
                    rounded-full
                    object-cover
                    object-[center_20%]
                    border-4
                    border-[#050816]
                  "
                />

              </div>

            </div>


            {/* Name */}

            <h1 className="
              text-4xl
              sm:text-5xl
              font-black
              mb-5
            ">

              Hi, I'm{" "}

              <span className="
                bg-gradient-to-r
                from-pink-400
                to-purple-500
                bg-clip-text
                text-transparent
              ">
                Praveen
              </span>

            </h1>


            {/* Role */}

            <p className="
              text-gray-400
              text-lg
              mb-6
            ">
              Frontend Developer & React Learner
            </p>


            {/* Introduction */}

            <p className="
              max-w-3xl
              mx-auto
              text-gray-400
              leading-8
            ">

              MovieHub is my first React project, created as part
              of my journey into modern frontend development.
              I built this application to learn React,
              APIs, reusable components, routing,
              state management, responsive design,
              and browser storage.

            </p>


            {/* Tags */}

            <div className="
              flex
              flex-wrap
              justify-center
              gap-3
              mt-8
            ">

              <span className="
                px-4
                py-2
                rounded-full
                bg-pink-400/10
                border
                border-pink-400/20
                text-pink-400
                text-sm
              ">
                First React Project
              </span>


              <span className="
                px-4
                py-2
                rounded-full
                bg-purple-400/10
                border
                border-purple-400/20
                text-purple-400
                text-sm
              ">
                TMDB API
              </span>


              <span className="
                px-4
                py-2
                rounded-full
                bg-blue-400/10
                border
                border-blue-400/20
                text-blue-400
                text-sm
              ">
                React.js
              </span>

            </div>

          </div>

        </section>



        {/* ================= ABOUT MOVIEHUB ================= */}

        <section className="
          bg-[#0f172a]
          py-14
          px-4
        ">

          <div className="max-w-5xl mx-auto">


            <h2 className="
              text-2xl
              sm:text-3xl
              font-bold
              text-center
              mb-5
            ">
              About MovieHub
            </h2>


            <p className="
              text-gray-400
              text-center
              max-w-3xl
              mx-auto
              leading-7
            ">

              MovieHub is a simple movie discovery website
              built using React. Movie information is
              collected from the TMDB API. Users can search
              for movies, explore trending movies, view
              movie details, and save their favorite movies.

            </p>


            {/* Feature Cards */}

            <div className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-5
              mt-10
            ">


              {/* Card 1 */}

              <div className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-6
                hover:bg-white/10
                hover:-translate-y-2
                transition
                duration-300
              ">

                <h3 className="
                  text-pink-400
                  text-lg
                  font-semibold
                  mb-3
                ">
                  🎬 Movie Discovery
                </h3>


                <p className="
                  text-gray-400
                  text-sm
                  leading-6
                ">
                  Users can explore trending and popular
                  movies and discover new movies.
                </p>

              </div>


              {/* Card 2 */}

              <div className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-6
                hover:bg-white/10
                hover:-translate-y-2
                transition
                duration-300
              ">

                <h3 className="
                  text-purple-400
                  text-lg
                  font-semibold
                  mb-3
                ">
                  🔍 Movie Search
                </h3>


                <p className="
                  text-gray-400
                  text-sm
                  leading-6
                ">
                  Users can search for movies using the
                  search box and get results from TMDB.
                </p>

              </div>


              {/* Card 3 */}

              <div className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-6
                hover:bg-white/10
                hover:-translate-y-2
                transition
                duration-300
              ">

                <h3 className="
                  text-red-400
                  text-lg
                  font-semibold
                  mb-3
                ">
                  ❤️ Favorites
                </h3>


                <p className="
                  text-gray-400
                  text-sm
                  leading-6
                ">
                  Users can save movies as favorites and
                  view them later from the Favorites page.
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* ================= TECHNOLOGIES ================= */}

        <section className="
          max-w-5xl
          mx-auto
          px-4
          py-14
        ">


          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-center
            mb-5
          ">
            Technologies Used
          </h2>


          <p className="
            text-gray-400
            text-center
            max-w-2xl
            mx-auto
            leading-7
          ">

            I used these technologies while building
            MovieHub. Each technology helped me understand
            a different part of frontend development.

          </p>


          {/* Technology Cards */}

          <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            gap-4
            mt-10
          ">


            <div className="
              border
              border-pink-500/30
              rounded-xl
              p-5
              text-center
              bg-pink-500/5
              hover:bg-pink-500/10
              hover:scale-105
              transition
            ">

              <h3 className="text-pink-400 font-semibold">
                React.js
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Building components
              </p>

            </div>


            <div className="
              border
              border-yellow-500/30
              rounded-xl
              p-5
              text-center
              bg-yellow-500/5
              hover:bg-yellow-500/10
              hover:scale-105
              transition
            ">

              <h3 className="text-yellow-400 font-semibold">
                JavaScript
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Application logic
              </p>

            </div>


            <div className="
              border
              border-blue-500/30
              rounded-xl
              p-5
              text-center
              bg-blue-500/5
              hover:bg-blue-500/10
              hover:scale-105
              transition
            ">

              <h3 className="text-blue-400 font-semibold">
                TMDB API
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Movie data
              </p>

            </div>


            <div className="
              border
              border-cyan-500/30
              rounded-xl
              p-5
              text-center
              bg-cyan-500/5
              hover:bg-cyan-500/10
              hover:scale-105
              transition
            ">

              <h3 className="text-cyan-400 font-semibold">
                Tailwind CSS
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Website design
              </p>

            </div>


            <div className="
              border
              border-purple-500/30
              rounded-xl
              p-5
              text-center
              bg-purple-500/5
              hover:bg-purple-500/10
              hover:scale-105
              transition
            ">

              <h3 className="text-purple-400 font-semibold">
                React Router
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Page navigation
              </p>

            </div>


            <div className="
              border
              border-green-500/30
              rounded-xl
              p-5
              text-center
              bg-green-500/5
              hover:bg-green-500/10
              hover:scale-105
              transition
            ">

              <h3 className="text-green-400 font-semibold">
                LocalStorage
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Saving user data
              </p>

            </div>

          </div>

        </section>



        {/* ================= LEARNING ================= */}

        <section className="
          bg-[#0f172a]
          py-14
          px-4
        ">

          <div className="
            max-w-5xl
            mx-auto
            text-center
          ">


            <h2 className="
              text-2xl
              sm:text-3xl
              font-bold
              mb-5
            ">
              What I Learned
            </h2>


            <p className="
              text-gray-400
              max-w-3xl
              mx-auto
              leading-7
            ">

              Before starting this project, I had only a basic
              understanding of React. While building MovieHub,
              I learned how to create reusable components,
              connect APIs, display data, use React Router,
              handle search, and store favorite movies.

            </p>


            {/* Learning Points */}

            <div className="
              mt-8
              max-w-3xl
              mx-auto
              text-left
            ">


              <div className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-5
                mb-3
                hover:bg-white/10
                transition
              ">

                <span className="text-pink-400 font-semibold">
                  01.
                </span>

                <span className="text-gray-300 ml-3">
                  Learned how React components work.
                </span>

              </div>


              <div className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-5
                mb-3
                hover:bg-white/10
                transition
              ">

                <span className="text-purple-400 font-semibold">
                  02.
                </span>

                <span className="text-gray-300 ml-3">
                  Learned how to connect a React project with an API.
                </span>

              </div>


              <div className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-5
                mb-3
                hover:bg-white/10
                transition
              ">

                <span className="text-blue-400 font-semibold">
                  03.
                </span>

                <span className="text-gray-300 ml-3">
                  Learned how to create multiple pages using React Router.
                </span>

              </div>


              <div className="
                bg-white/5
                border
                border-white/10
                rounded-xl
                p-5
                hover:bg-white/10
                transition
              ">

                <span className="text-red-400 font-semibold">
                  04.
                </span>

                <span className="text-gray-300 ml-3">
                  Learned how to manage and save favorite movies.
                </span>

              </div>

            </div>


            {/* Explore Button */}

            <button
              onClick={() => navigate("/movies")}
              className="
                mt-10
                px-7
                py-3
                bg-pink-600
                hover:bg-pink-500
                hover:scale-105
                text-white
                font-semibold
                rounded-lg
                transition
                duration-300
                shadow-lg
                shadow-pink-600/20
              "
            >
              🎬 Explore Movies
            </button>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <Footer />

    </div>

  );
}


export default About;