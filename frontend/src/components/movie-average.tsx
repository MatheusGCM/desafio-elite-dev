import { Star } from "lucide-react";

interface MovieAverageProps {
  vote_average: number;
  fontSize?: string;
  iconSize?: string;
}

export function MovieAverage({
  vote_average,
  iconSize = "size-4",
  fontSize = "text-base",
}: MovieAverageProps) {
  return (
    <div className={`flex items-center gap-1 ${fontSize}`}>
      <Star
        className={`inline-block text-amber-500 mb-1 fill-current ${iconSize}`}
      />
      <p>
        {vote_average
          ? `${
              vote_average === 10 ? vote_average : vote_average?.toFixed(1)
            }/10`
          : "0.0/10"}
      </p>
    </div>
  );
}
