import React from "react";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { Movie } from "@/utils/types";
import { useBookmarks } from "@/context/BookmarkContext";

function MovieItem({ movie }: { movie: Movie }) {
  const { backdrop_path, title, release_date, vote_average } = movie.properties;
  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : null;

  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const isBookmarked = bookmarks.some((item) => item.id === movie.id);

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(movie.id);
    } else {
      addBookmark(movie);
    }
  };

  return (
    <div className="relative w-[320px] h-full">
      <div className="overflow-hidden rounded-lg">
        <div className="relative transition-transform duration-300 transform hover:scale-110">
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>

        <div
          className="absolute top-0 right-0 p-4 cursor-pointer"
          onClick={handleBookmarkClick}
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
        <div className="flex flex-row gap-1 mt-3">
          <p className="text-slate-300">{releaseYear}</p>
          <span className="bullet"></span>
          <p className="text-slate-300">{vote_average}</p>
        </div>
        <h2 className="text-white cursor-pointer font-semibold hover:underline underline-offset-8 transition-transform duration-300 ease-in-out">
          {title}
        </h2>
      </Link>
    </div>
  );
}

export default MovieItem;
