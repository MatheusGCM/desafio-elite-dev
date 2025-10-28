import type { TMDbSearchResponse } from "../@types/tmdb";
import { api } from "../lib/axios";

export async function getPopularMovies(page?: number) {
  const { data } = await api.get<TMDbSearchResponse>(
    `tmdb/movies/popular?page=${page ?? 1}`
  );
  return data;
}
