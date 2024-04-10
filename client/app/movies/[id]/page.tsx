"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { MovieProperties } from "@/utils/types";
import { genres } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SimilarItems from "@/components/SimilarItems";

function MoviePage() {
  const { id } = useParams();
  const router = useRouter();

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
    <div className="flex flex-col gap-12 text-white pl-32 py-12">
      <button
        className="bg-primary hover:bg-primary/70 w-[128px] text-white font-semibold py-2 px-4 rounded"
        onClick={router.back}
      >
        <ArrowLeft className="inline-block mr-2" size={22} />
        Go back
      </button>
      <div className="flex flex-row gap-24">
        <div className="w-1/3">
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
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-white">Similar Movies</h2>
        <div className="flex flex-row gap-4">
          <SimilarItems id={Array.isArray(id) ? id[0] : id} />
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
