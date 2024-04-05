"use client";
import React from "react";
import { useParams } from "next/navigation";
import { DEFAULT_MOVIES } from "@/utils";
import { Movie } from "@/utils/types";

function Movie() {
  const { id } = useParams();

  const movie = DEFAULT_MOVIES.find((movie: Movie) => movie.id === Number(id));

  return (
    <div className="h-full border border-white flex flex-row gap-24 text-white pl-32 py-12">
      <div className="h-[80%] w-1/3">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop}`}
          alt={movie?.title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="text-slate-500">
        <h1 className="text-3xl font-semibold text-white mb-3">
          {movie?.title}
        </h1>
        <p>{movie?.year}</p>
        <p>{movie?.rating}</p>
        <p>{movie?.genres.join(", ")}</p>
      </div>
    </div>
  );
}

export default Movie;
