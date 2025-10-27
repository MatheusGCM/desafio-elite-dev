import { useParams } from "react-router-dom";

export function SharedList() {
  // Pega o 'shareId' da URL (ex: /share/f47ac10b...)
  const { shareId } = useParams<{ shareId: string }>();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Lista de Filmes Compartilhada</h1>
        <p className="mt-2 text-sm text-gray-500">
          Carregando lista com o ID: {shareId}
        </p>
      </div>
    </div>
  );
}
