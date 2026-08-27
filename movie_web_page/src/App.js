import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import About from "./pages/About";
import Chatbot from "./components/Chatbot";


// =====================================
// Protected Layout
// =====================================

function MainLayout() {
  return (
    <>
      <Outlet />

      {/* Chatbot appears only inside the main app */}
      <Chatbot />
    </>
  );
}


// =====================================
// App
// =====================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ============================= */}
        {/* Login / Register */}
        {/* ============================= */}

        <Route
          path="/"
          element={<Auth />}
        />


        {/* ============================= */}
        {/* Main Application */}
        {/* ============================= */}

        <Route element={<MainLayout />}>

          <Route
            path="/movies"
            element={<Home />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;