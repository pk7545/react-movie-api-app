import React from "react";
import MovieCard from "./MovieCard";

function MovieSection({ title, movies, onFavorite, favorites }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => {
          const isFavorite = favorites.some(
            (fav) => fav.id === movie.id
          );
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavorite={onFavorite}
              isFavorite={isFavorite}
            />
          );
        })}
      </div>
    </section>
  );
}

export default MovieSection;