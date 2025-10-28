import type { TMDbMovie } from "../@types/tmdb";
import { api } from "../lib/axios";

export async function getShareMovies(shareId: string | undefined) {
  const { data } = await api.get<TMDbMovie[]>(`/favorites/share/${shareId}`);
  return data;
}
