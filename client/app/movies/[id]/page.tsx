"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DEFAULT_MOVIES } from "@/utils";
import { Movie } from "@/utils/types";
import useFetch from "@/hooks/useFetch";
import { MovieProperties } from "@/utils/types";
import { genres } from "@/utils";

function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<MovieProperties | null>(null);

  const { data, isLoading, error } = useFetch(
    `http://localhost:5000/get-movie/${id}`
  );

  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div className="border border-white flex flex-row gap-24 text-white pl-32 py-12">
      <div className="w-1/3 border border-white">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="text-slate-500">
        <h1 className="text-3xl font-semibold text-white mb-3">
          {movie?.title}
        </h1>
        <p>Year: {releaseYear}</p>
        <p>Score: {movie?.vote_average}</p>
        <p className="pb-8">
          {movie?.genre_ids
            .map((genre) => genres[genre as keyof typeof genres])
            .join(", ")}
        </p>
        <p className="w-2/3">{movie?.overview}</p>
      </div>
    </div>
  );
}

export default MoviePage;
