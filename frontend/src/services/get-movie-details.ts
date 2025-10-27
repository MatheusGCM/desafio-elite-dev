import type { TMDbMovie } from "../@types/tmdb";
import { api } from "../lib/axios";

export async function getMovieDetails(movieId: number) {
  const { data } = await api.get<TMDbMovie>(`/tmdb/movies/${movieId}`);
  return data;
}
