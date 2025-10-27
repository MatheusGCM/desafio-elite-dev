import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../components/movie-card";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/get-popular-movies";
import { BookHeart, LoaderCircle, Search } from "lucide-react";
import { getFavoriteMovieIds } from "../services/get-favorite-movie-ids";
import { toast } from "sonner";
import { useUserStore, type UserProps } from "../store/user-store";
import { searchMovie } from "../services/search-movie";
import { useDebounce } from "../hooks/use-debounce";

export function Home() {
  const navigate = useNavigate();
  const { user, saveUser, saveFavoriteIds } = useUserStore();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 2000);

  const { data: dataPopularMovies, isLoading: isLoadingDataPopularMovies } =
    useQuery({
      queryKey: ["popular-movies"],
      queryFn: async () => await getPopularMovies(),
    });
  const { data: favoriteIds, isLoading: isLoadingFavoriteIds } = useQuery({
    queryKey: ["favorite-ids"],
    queryFn: async () => await getFavoriteMovieIds(user?.id),
  });
  const { data: searchResults, isLoading: isLoadingSearchResults } = useQuery({
    queryKey: ["search-movies", debouncedSearchTerm],
    queryFn: async () => await searchMovie(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm.trim(),
    placeholderData: (previousData) => previousData,
  });

  function handleClickMovie(movieId: number) {
    navigate(`/details/${movieId}`);
  }

  function handleClickFavorites() {
    if (favoriteIds?.length === 0) {
      toast.info("Adicione filmes aos favoritos!");
      return;
    }

    navigate("/favorites");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user-storage");
    if (!storedUser) {
      navigate("/register", { replace: true });
      return;
    }

    if (!user) {
      saveUser(JSON.parse(storedUser) as UserProps);
    }
  }, [navigate, user, saveUser]);

  useEffect(() => {
    if (favoriteIds) {
      saveFavoriteIds(favoriteIds);
    }
  }, [favoriteIds, saveFavoriteIds]);

  if (isLoadingDataPopularMovies || isLoadingFavoriteIds) return;

  const dataMovies =
    debouncedSearchTerm !== "" ? searchResults : dataPopularMovies;

  const dataMoviesFiltered = dataMovies?.results.filter(
    ({ poster_path }) => poster_path !== null
  );

  return (
    <div className="space-y-6 mt-3 md:px-40">
      <div className="flex justify-between items-center">
        <h1
          className="text-3xl font-bold uppercase text-red-600 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Filmezando
        </h1>

        <button
          className="flex items-center gap-1 cursor-pointer relative"
          onClick={handleClickFavorites}
        >
          <BookHeart size={36} strokeWidth={1} className=" inline-block" />

          <div className="bg-red-600 size-4.5 rounded-full absolute -bottom-1 -right-1 flex justify-center items-center">
            <span className="text-xs font-light text-white">
              {favoriteIds?.length}
            </span>
          </div>
        </button>
      </div>
      <p className="mt-2 text-xl">
        Olá, <span className="text-red-400">{user?.name.split(" ")[0]}</span>!
      </p>
      <div className="flex justify-between">
        <p className="mt-2 text-md font-light">Filmes populares este mês</p>
        <div className="flex items-center gap-2 border border-zinc-600 p-2 rounded-md ">
          <input
            type="text"
            placeholder="Buscar filme..."
            className="placeholder:text-zinc-400 border-none outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search className="size-5 text-zinc-400" />
        </div>
      </div>

      {isLoadingSearchResults ? (
        <div className="flex justify-center items-center">
          <LoaderCircle className="text-white size-10 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-5 justify-items-center gap-y-6">
          {dataMoviesFiltered?.map((item) => (
            <MovieCard
              key={item.id}
              onClick={() => handleClickMovie(item.id)}
              {...item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
