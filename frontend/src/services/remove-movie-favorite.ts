import { api } from "../lib/axios";

export async function removeMovieFavorite(userId: string, movieId: number) {
  return await api.delete<{ message: string }>(`/user/favorites/${movieId}`, {
    params: { userId },
  });
}
