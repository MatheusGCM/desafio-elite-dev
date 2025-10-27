export interface TMDbMovie {
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

export interface TMDbSearchResponse {
  page: number;
  results: TMDbMovie[];
  total_pages: number;
  total_results: number;
}
