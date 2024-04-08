"use client";
import React from "react";
// import { useBookmarks } from "@/hooks/useBookmarks";
import useLocalStorage from "@/hooks/useLocalStorage";
import MovieItem from "@/components/Movie";

function Bookmarks() {
  // const { bookmarks } = useBookmarks();
  const [bookmarks] = useLocalStorage("bookmarks", []);
  console.log("bookmarks: ", bookmarks);

  if (!bookmarks.length || bookmarks.length === 0) {
    return (
      <div className="flex flex-col gap-12 text-white">
        <div className="m-3">
          <h1 className="text-2xl text-white font-thin mb-5">
            Bookmarked Movies
          </h1>
          <p>No bookmarks yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 text-white">
      <div className="m-3">
        <h1 className="text-2xl text-white font-thin mb-5">
          Bookmarked Movies
        </h1>
        <ul className="flex flex-wrap gap-5">
          {bookmarks.map((bookmark, idx) => (
            <MovieItem key={idx} movie={bookmark} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Bookmarks;
