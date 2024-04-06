"use client";
import React, { useEffect, useState } from "react";
import TrendingMovie from "@/components/TrendingMovie";
import MovieItem from "@/components/Movie";
import useFetch from "@/hooks/useFetch";
import { DEFAULT_MOVIES } from "@/utils";
import { Movie } from "@/utils/types";
import Searchbar from "@/components/Searchbar";
import useDebounce from "@/hooks/useDebounce";

function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, error } = useFetch(
    // only add query if searchQuery is not null
    searchQuery
      ? `http://localhost:5000/get-movies?limit=8&query=${searchQuery}`
      : "http://localhost:5000/get-movies?limit=8",
    {},
    [debouncedSearchQuery]
  );

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (searchQuery) {
    return (
      <div className="flex flex-col gap-12 text-white m-3">
        <Searchbar search={searchQuery} setSearch={setSearchQuery} />

        <div className="">
          <h1 className="text-2xl text-white font-thin mb-5">
            Search results for "{searchQuery}"
          </h1>
          <ul className="flex flex-row flex-wrap gap-5">
            {movies?.length > 0 ? (
              movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
            ) : (
              <p>No movies found</p>
            )}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 text-white m-3">
      <Searchbar search={searchQuery} setSearch={setSearchQuery} />

      <div className="h-full">
        <h1 className="text-2xl text-white font-thin mb-5">Trending</h1>
        <ul
          className="flex gap-8"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {movies?.map((movie) => (
            <TrendingMovie key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>

      <div className="">
        <h1 className="text-2xl text-white font-thin mb-5">
          Recommended for you
        </h1>
        <ul className="flex flex-row flex-wrap gap-5">
          {movies?.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
