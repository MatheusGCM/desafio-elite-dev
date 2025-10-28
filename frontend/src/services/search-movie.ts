import type { TMDbSearchResponse } from "../@types/tmdb";
import { api } from "../lib/axios";

export async function searchMovie(q: string, page?: number) {
  const { data } = await api.get<TMDbSearchResponse>("tmdb/search", {
    params: { q, page: page ?? 1 },
  });
  return data;
}
