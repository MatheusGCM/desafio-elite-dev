import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/get-movie-details";
import { MovieAverage } from "../components/movie-average";
import { Heart, LoaderCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useEffect, useState } from "react";
import { addMovieFavorite } from "../services/add-movie-favorite";
import { removeMovieFavorite } from "../services/remove-movie-favorite";
import { queryClient } from "../lib/react-query";
import { toast } from "sonner";
import { useUserStore } from "../store/user-store";

export function Details() {
  const { movieId } = useParams();
  const { user, favoriteIds } = useUserStore();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: movieDetails, isLoading: isLoadingMovieDetails } = useQuery({
    queryKey: ["movie-details"],
    queryFn: async () => await getMovieDetails(Number(movieId)),
  });
  const { mutateAsync: addMovieFavoriteFn } = useMutation({
    mutationFn: async ({
      userId,
      movieId,
    }: {
      userId: string;
      movieId: number;
    }) => await addMovieFavorite(userId, movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", "favorite-ids"],
      });
      toast.success("Filme adicionado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao favoritar filme. Tente novamente.");
    },
  });
  const { mutateAsync: removeMovieFavoriteFn } = useMutation({
    mutationFn: async ({
      userId,
      movieId,
    }: {
      userId: string;
      movieId: number;
    }) => await removeMovieFavorite(userId, movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", "favorite-ids"],
      });
      toast.success("Filme removido com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover dos favoritos. Tente novamente.");
    },
  });

  async function handleToggleFavorite() {
    if (!user) return;

    const prevIsFavorite = isFavorite;
    setIsFavorite(!prevIsFavorite);

    if (prevIsFavorite) {
      await removeMovieFavoriteFn({
        userId: user.id,
        movieId: Number(movieId),
      });
    } else {
      await addMovieFavoriteFn({ userId: user.id, movieId: Number(movieId) });
    }
  }

  useEffect(() => {
    if (favoriteIds) {
      const hasMovieIdInFavorites = favoriteIds.includes(Number(movieId));
      setIsFavorite(hasMovieIdInFavorites);
    }
  }, []);

  if (isLoadingMovieDetails)
    return (
      <div className="flex h-screen justify-center items-center">
        <LoaderCircle className="size-10 animate-spin text-white" />
      </div>
    );

  return (
    <div className="md:px-40">
      <img
        src={`http://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
        alt={movieDetails?.title}
        className="w-full h-40 md:h-70 object-cover md:opacity-60"
        loading="lazy"
      />
      <div className="flex gap-8 px-3 md:px-0">
        <img
          src={`http://image.tmdb.org/t/p/w300${movieDetails?.poster_path}`}
          alt={movieDetails?.title}
          className="relative rounded-xl ml-5 -top-50 hidden md:flex"
        />
        <div className="mt-5">
          <div className="flex flex-wrap justify-between items-start gap-5 mb-5">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-3xl font-bold flex-1 text-center md:text-start">
                {movieDetails?.title}
              </h1>
              <div className="flex gap-5 items-center md:flex-none md:gap-3">
                <span className="font-light text-xs">
                  {movieDetails?.runtime} min
                </span>
                <span className="font-light text-xs">
                  ({movieDetails?.release_date.split("-")[0]})
                </span>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="size-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
                    onClick={handleToggleFavorite}
                  >
                    <Heart
                      size={27}
                      className={`${
                        isFavorite
                          ? "fill-red-600 text-red-600"
                          : "fill-none text-zinc-950"
                      }`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Adicionar aos favoritos</TooltipContent>
              </Tooltip>
            </div>
            <div>
              <MovieAverage
                vote_average={movieDetails?.vote_average || 0}
                fontSize="text-3xl"
                iconSize="size-6"
              />
            </div>
          </div>

          <p className="mb-2">
            <strong>Gêneros:</strong>{" "}
            <span className="font-light">
              {movieDetails?.genres.map((genre) => genre.name).join(", ")}
            </span>
          </p>
          <p className="mb-2">
            <strong>Sinopse: </strong>
            <span className="font-light">{movieDetails?.overview}</span>
          </p>
          {/* <p className="mb-2">
            <strong>Popularidade: </strong>
            <span className="font-light">{popularityFormatted} </span>
          </p> */}
        </div>
      </div>
    </div>
  );
}
