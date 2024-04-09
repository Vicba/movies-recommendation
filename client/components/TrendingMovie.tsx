import React from "react";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Movie } from "@/utils/types";

function TrendingMovie({ movie }: { movie: Movie }) {
  const { backdrop_path, title, release_date, vote_average } = movie.properties;
  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : null;

  const { bookmarks, handleBookmark } = useBookmarks();

  return (
    <div className="relative flex-shrink-0 w-[384px] h-full overflow-hidden rounded-lg">
      <div className="relative transition-transform duration-300 transform hover:scale-110">
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      </div>

      <Link
        href={`/movies/${movie.id}`}
        className="absolute bottom-0 left-0 p-4"
      >
        <ul className="flex flex-row gap-1">
          <p className="text-slate-300">{releaseYear}</p>
          <span className="bullet"></span>
          <p className="text-slate-300">{vote_average}</p>
        </ul>
        <h2 className="text-white cursor-pointer font-semibold">{title}</h2>
      </Link>

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
  );
}

export default TrendingMovie;
