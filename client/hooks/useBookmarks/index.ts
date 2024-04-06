import { useState } from "react";
import { Movie } from "../../utils/types";
import useLocalStorage from "../useLocalStorage";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<Movie[]>("bookmarks", []);

  const handleBookmark = (movie: Movie) => {
    const isBookmarked = bookmarks.some((item) => item.id === movie.id);

    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((item) => item.id !== movie.id);
      setBookmarks(newBookmarks);
    } else {
      setBookmarks([...bookmarks, movie]);
    }
  };

  return { bookmarks, handleBookmark };
};
