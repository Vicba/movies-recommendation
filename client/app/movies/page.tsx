"use client";
import React from "react";
import { genres } from "@/utils";
import GenreItems from "@/components/GenreItems";

function Movies() {
  return (
    <div className="flex flex-col gap-12 text-white m-3">
      <h1 className="text-3xl font-semibold text-white">Movies by genre</h1>

      {Object.entries(genres).map(([id, genre]) => (
        <GenreItems key={id} id={id} genre={genre} />
      ))}
    </div>
  );
}

export default Movies;
