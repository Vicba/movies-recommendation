import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/utils/types";
import TrendingMovie from "@/components/TrendingMovie";

function GenreItems({ id, genre }: { id: string; genre: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const { data, isLoading, error } = useFetch(
    `http://localhost:5000/get-movies-by-genre/${Number(id)}`
  );

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full overflow-x-auto scrollbar">
      <h1 className="text-2xl text-white font-thin mb-5">{genre}</h1>
      <ul className="flex gap-8">
        {movies?.map((movie) => (
          <TrendingMovie key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default GenreItems;
