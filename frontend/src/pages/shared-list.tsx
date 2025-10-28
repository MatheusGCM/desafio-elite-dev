import { useParams } from "react-router-dom";
import { getShareMovies } from "../services/get-share-movies";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { MovieCard } from "../components/movie-card";
import { MovieAverage } from "../components/movie-average";

export function SharedList() {
  const { shareId } = useParams<{ shareId: string }>();

  const { data: dataShareMovies, isLoading: isLoadingFavoriteMovies } =
    useQuery({
      queryKey: ["share-movies"],
      queryFn: async () => await getShareMovies(shareId),
    });

  return (
    <div className="space-y-15 pt-5 pb-10 px-3 md:px-40">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Filmes <span className="text-red-400">compartilhados</span>
        </h1>
      </div>
      {isLoadingFavoriteMovies ? (
        <div className="flex justify-center">
          <LoaderCircle className="size-10 text-white animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
          {dataShareMovies?.map((item) => (
            <div className="flex gap-3 items-center md:items-start flex-col md:flex-row">
              <div className="hidden md:flex">
                <MovieCard
                  key={item.id}
                  poster_path={item.poster_path}
                  disabled
                />
              </div>
              <img
                src={`http://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                alt={item.title}
                className="w-full h-40 object-cover md:hidden"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-1">
                  <h1 className="text-xl font-bold">{item.title}</h1>
                  <span className="font-light text-xs">{item.runtime} min</span>
                  <span className="font-light text-xs">
                    ({item.release_date.split("-")[0]})
                  </span>
                </div>

                <div>
                  <MovieAverage
                    vote_average={item.vote_average || 0}
                    fontSize="text-xl"
                    iconSize="size-5"
                  />
                </div>
                <p className="mt-2 text-sm">
                  <strong>Gêneros:</strong>{" "}
                  <span className="font-light">
                    {item.genres.map((genre) => genre.name).join(", ")}
                  </span>
                </p>

                <p className="md:line-clamp-6 text-sm" title={item.overview}>
                  <strong>Sinopse: </strong>
                  <span className="font-light">{item.overview}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
