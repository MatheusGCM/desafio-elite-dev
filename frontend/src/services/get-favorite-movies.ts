import type { TMDbMovie } from "../@types/tmdb";
import { api } from "../lib/axios";

export async function getFavoriteMovies(userId: string | undefined) {
  const { data } = await api.get<TMDbMovie[]>("/user/favorites", {
    params: {
      userId,
    },
  });
  return data;
}
