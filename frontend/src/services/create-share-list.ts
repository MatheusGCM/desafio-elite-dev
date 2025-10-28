import { api } from "../lib/axios";

interface CreateShareListResponse {
  message: string;
  shareId: string;
}

export async function createShareList(userId: string) {
  const { data } = await api.post<CreateShareListResponse>(
    "/user/favorites/share",
    {
      userId,
    }
  );

  return data;
}
