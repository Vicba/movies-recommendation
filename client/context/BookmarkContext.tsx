"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Movie } from "@/utils/types";

type BookmarksContextType = {
  bookmarks: Movie[];
  addBookmark: (movie: Movie) => void;
  removeBookmark: (id: string) => void;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(
  undefined
);

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useLocalStorage<Movie[]>("bookmarks", []);

  const addBookmark = (movie: Movie) => {
    setBookmarks([...bookmarks, movie]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((movie) => movie.id !== id));
  };

  const contextValue: BookmarksContextType = {
    bookmarks,
    addBookmark,
    removeBookmark,
  };

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
};
