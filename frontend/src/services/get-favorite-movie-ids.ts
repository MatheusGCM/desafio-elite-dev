import { api } from "../lib/axios";

export async function getFavoriteMovieIds(userId: string | undefined) {
  const { data } = await api.get<number[]>("/user/favorites/ids", {
    params: {
      userId,
    },
  });
  return data;
}
