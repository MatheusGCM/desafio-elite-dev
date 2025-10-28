import { useMutation, useQuery } from "@tanstack/react-query";
import { getFavoriteMovies } from "../services/get-favorite-movies";
import { MovieCard } from "../components/movie-card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoaderCircle, Share } from "lucide-react";
import { useUserStore } from "../store/user-store";
import { toast } from "sonner";
import { createShareList } from "../services/create-share-list";

export function Favorites() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { data: favoriteMovies, isLoading: isLoadingFavoriteMovies } = useQuery(
    {
      queryKey: ["favorites"],
      queryFn: async () => await getFavoriteMovies(user?.id),
    }
  );
  const {
    mutateAsync: createShareListFn,
    isPending: isPendingCreateShareList,
  } = useMutation({
    mutationFn: async (userId: string) => await createShareList(userId),
    onSuccess: async ({ shareId }) => {
      const shareLink = `${window.location.origin}/share/${shareId}`;
      await navigator.clipboard.writeText(shareLink);
      toast.success(`Link copiado para a área de transferência`);
    },
    onError: () => {
      toast.error("Erro ao gerar link de compartilhamento. Tente novamente.");
    },
  });

  function handleClickMovie(movieId: number) {
    navigate(`/details/${movieId}`);
  }

  async function handleShare() {
    if (!user?.id) {
      toast.error("Usuário inválido!");
      return;
    }
    await createShareListFn(user.id);
  }

  useEffect(() => {
    if (favoriteMovies?.length === 0) navigate("/", { replace: true });
  }, [favoriteMovies]);

  return (
    <div className="mt-5 space-y-15 px-2 md:px-40">
      <div className="flex gap-2 md:gap-0 text-center md:text-start items-center md:items-start md:justify-between flex-col md:flex-row">
        <h1 className="text-3xl font-bold">
          Filmes favoritos de{" "}
          <span className="text-red-400">{user?.name.split(" ")[0]}</span>!
        </h1>
        <button
          disabled={isPendingCreateShareList}
          type="submit"
          className="flex justify-center w-40 items-center gap-1 rounded font-light border border-zinc-200 py-2 text-zinc-200 hover:opacity-80 cursor-pointer"
          onClick={handleShare}
        >
          <p>Compartilhar</p>
          <span>
            {isPendingCreateShareList ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Share className="size-5" />
            )}
          </span>
        </button>
      </div>
      {isLoadingFavoriteMovies ? (
        <div className="flex justify-center">
          <LoaderCircle className="size-10 text-white animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 justify-items-center gap-y-6">
          {favoriteMovies?.map((item) => (
            <div>
              <MovieCard
                key={item.id}
                onClick={() => handleClickMovie(item.id)}
                poster_path={item.poster_path}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
