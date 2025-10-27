import type { TMDbSearchResponse } from "../@types/tmdb";
import { api } from "../lib/axios";

export async function searchMovie(q: string) {
  const { data } = await api.get<TMDbSearchResponse>("tmdb/search", {
    params: { q },
  });
  return data;
}
