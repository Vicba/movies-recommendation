"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TrendingMovie from "@/components/TrendingMovie";
import Movie from "@/components/Movie";
// import useFetch from "@/hooks/useFetch";
import { DEFAULT_MOVIES } from "@/utils";

function Dashboard() {
  const [text, setText] = useState("Dashboard");
  // const { data, isLoading, error } = useFetch("http://api:5000/");

  // useEffect(() => {
  //   const getText = async () => {
  //     const res = await axios.get("http://localhost:5000/");
  //     console.log("Data received:", res.data.message);
  //     // setText(data.text);
  //   };
  //   getText();
  // }, []);

  return (
    <div className="flex flex-col gap-12 text-white">
      <div className="m-3">
        <h1 className="text-2xl text-white font-thin mb-5">Trending</h1>
        <ul className="flex flex-row gap-8">
          {
            // data?.movies?.map((movie) => (
            DEFAULT_MOVIES.map((movie) => (
              <TrendingMovie key={movie.id} movie={movie} />
            ))
          }
        </ul>
      </div>

      <div className="m-3">
        <h1 className="text-2xl text-white font-thin mb-5">
          Recommended for you
        </h1>
        <ul className="flex flex-row flex-wrap gap-5">
          {
            // data?.movies?.map((movie) => (
            DEFAULT_MOVIES.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
