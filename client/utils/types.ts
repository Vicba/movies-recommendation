export type MovieProperties = {
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  tmdb_id: number;
  vote_average: number;
};

export type Movie = {
  id: string;
  properties: MovieProperties;
};
