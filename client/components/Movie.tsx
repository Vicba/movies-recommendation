import React from "react";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/utils/types";
import { useBookmarks } from "@/hooks/useBookmarks";

type MovieProps = {
  movie: {
    id: number;
    title: string;
    year: number;
    rating: number;
    genres: string[];
    backdrop: string;
  };
};

function Movie({ movie }: MovieProps) {
  const { title, year, rating, backdrop } = movie;
  const { bookmarks, handleBookmark } = useBookmarks();

  return (
    <div className="relative w-[320px] h-full">
      <div className="overflow-hidden rounded-lg">
        <div className="relative transition-transform duration-300 transform hover:scale-110">
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop}`}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>

        <div
          className="absolute top-0 right-0 p-4 cursor-pointer"
          onClick={() => handleBookmark(movie)}
        >
          <Bookmark
            className="text-white"
            fill={
              bookmarks.some((item: Movie) => item.id === movie.id)
                ? "white"
                : "none"
            }
            size={24}
          />
        </div>
      </div>

      <Link href={`/movies/${movie.id}`}>
        <ul className="flex flex-row gap-1 mt-3">
          <p className="text-slate-300">{year}</p>
          <span className="bullet"></span>
          <p className="text-slate-300">{rating}</p>
        </ul>
        <h2 className="text-white cursor-pointer font-semibold hover:underline underline-offset-8 transition-transform duration-300 ease-in-out">
          {title}
        </h2>
      </Link>
    </div>
  );
}

export default Movie;
