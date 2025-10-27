import { api } from "../lib/axios";

interface AddMovieFavoriteResponse {
  userId: string;
  movieId: number;
  createdAt: Date;
  id: number;
}

export async function addMovieFavorite(userId: string, movieId: number) {
  const { data } = await api.post<AddMovieFavoriteResponse>("/user/favorites", {
    userId,
    movieId,
  });

  return data;
}
