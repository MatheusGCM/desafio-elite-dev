import { MovieAverage } from "./movie-average";

interface MovieCardProps {
  poster_path: string | null;
  vote_average?: number;
  onClick?(): void;
  disabled?: boolean;
}

export function MovieCard({
  poster_path,
  vote_average,
  onClick,
  disabled,
}: MovieCardProps) {
  return (
    <button
      className={`flex flex-col ${
        disabled ? "cursor-default" : "cursor-pointer"
      } gap-2`}
      onClick={onClick}
      disabled={(poster_path === null && vote_average === 0) || disabled}
    >
      <img
        src={`http://image.tmdb.org/t/p/w185${poster_path}`}
        className="md:w-[185px] h-full rounded-xl"
        alt="poster filme"
        loading="lazy"
        width={165}
      />

      {vote_average !== undefined && (
        <MovieAverage vote_average={vote_average} />
      )}
    </button>
  );
}
