import { useQuery } from "@tanstack/react-query";
import { getFavoriteMovies } from "../services/get-favorite-movies";
import { MovieCard } from "../components/movie-card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useUserStore } from "../store/user-store";

export function Favorites() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { data: favoriteMovies, isLoading: isLoadingFavoriteMovies } = useQuery(
    {
      queryKey: ["favorites"],
      queryFn: async () => await getFavoriteMovies(user?.id),
    }
  );

  function handleClickMovie(movieId: number) {
    navigate(`/details/${movieId}`);
  }

  useEffect(() => {
    if (favoriteMovies?.length === 0) navigate("/", { replace: true });
  }, [favoriteMovies]);

  return (
    <div className="mt-5 space-y-15 pt-5 md:px-40">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold text-center">
          Filmes favoritos de{" "}
          <span className="text-red-400">{user?.name.split(" ")[0]}</span>!
        </h1>
      </div>
      {isLoadingFavoriteMovies ? (
        <div className="flex justify-center">
          <LoaderCircle className="size-10 text-white animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-5 justify-items-center gap-y-6">
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
