import type { TMDbSearchResponse } from "../@types/tmdb";
import { api } from "../lib/axios";

export async function getPopularMovies() {
  const { data } = await api.get<TMDbSearchResponse>("tmdb/movies/popular");
  return data;
}
