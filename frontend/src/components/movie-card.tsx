import { Clapperboard } from "lucide-react";
import { MovieAverage } from "./movie-average";

interface MovieCardProps {
  poster_path: string | null;
  vote_average?: number;
  onClick(): void;
}

export function MovieCard({
  poster_path,
  vote_average,
  onClick,
}: MovieCardProps) {
  return (
    <button
      className="flex flex-col cursor-pointer gap-2"
      onClick={onClick}
      disabled={poster_path === null && vote_average === 0}
    >
      {poster_path ? (
        <img
          src={`http://image.tmdb.org/t/p/w185${poster_path}`}
          className="w-full h-auto rounded-xl"
          alt="poster filme"
          loading="lazy"
        />
      ) : (
        <div className="flex justify-center items-center w-[185px] h-full border border-zinc-400 rounded-xl">
          <Clapperboard className="text-zinc-400 size-10" />
        </div>
      )}

      {vote_average !== undefined && (
        <MovieAverage vote_average={vote_average} />
      )}
    </button>
  );
}
