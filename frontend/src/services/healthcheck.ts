import { api } from "../lib/axios";

export interface HealthcheckResponse {
  status: "ok" | "error";
  message: string;
  timestamp?: string;
  error?: string;
}

export async function healthcheck() {
  try {
    const { data } = await api.get<HealthcheckResponse>("/healthcheck");
    return data;
  } catch (error) {
    return {
      status: "error",
      message: "Falha ao conectar à API ou ao banco de dados.",
    };
  }
}
