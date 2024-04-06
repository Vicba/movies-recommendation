import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/utils/types";
import TrendingMovie from "@/components/TrendingMovie";

function SimilarItems({ id }: { id: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data, isLoading } = useFetch(
    `http://localhost:5000/get-similar-movies/${id}`
  );

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setError(error.toString());
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full">
      <ul className="flex flex-row gap-8">
        {movies?.slice(1).map((movie) => (
          <TrendingMovie key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default SimilarItems;
