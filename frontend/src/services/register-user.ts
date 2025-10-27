import { api } from "../lib/axios";

export interface RegisterUserResponse {
  id: string;
  name: string;
  createdAt: string;
}

export async function registerUser(
  name: string
): Promise<RegisterUserResponse> {
  const { data } = await api.post<RegisterUserResponse>("/user/register", {
    name,
  });
  return data;
}
