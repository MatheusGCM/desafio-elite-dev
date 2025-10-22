import { useEffect, useState } from "react";
import { healthcheck } from "./services/healthcheck";

export function App() {
  const [data, setData] = useState({
    status: "loading",
    message: "Carregando...",
  });

  async function fetchHealthcheck() {
    const result = await healthcheck();

    const { status, message } = result;

    setData({ status, message });
  }

  useEffect(() => {
    fetchHealthcheck();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-blue-500">Desafio Elite Dev</h1>
      <p className="mt-2 text-lg text-gray-300">
        Front-end (Vite + React + TS + Tailwind) funcionando!
      </p>
      <div className="mt-6 rounded bg-gray-800 p-4">
        <h2 className="text-2xl font-semibold mb-2">Healthcheck API</h2>
        <p>
          Status:{" "}
          <span
            className={data.status === "ok" ? "text-green-400" : "text-red-400"}
          >
            {data.status}
          </span>
        </p>
        <p className="mt-1">Message: {data.message}</p>
      </div>
    </div>
  );
}
