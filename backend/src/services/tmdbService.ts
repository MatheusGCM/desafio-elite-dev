import { TMDbMovie, TMDbSearchResponse } from "../@types/tmdb";
import { tmdbApi } from "../lib/axios";

export async function searchMovies(query: string, page?: number) {
  try {
    const { data } = await tmdbApi.get<TMDbSearchResponse>("/search/movie", {
      params: {
        query,
        page: page ?? 1,
        include_adult: false,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes (searchMovies):", error);
    throw new Error("Falha ao buscar filmes no TMDb.");
  }
}

export async function getMovieDetails(movieId: number) {
  try {
    const { data } = await tmdbApi.get<TMDbMovie>(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme (getMovieDetails):", error);
    throw new Error("Falha ao buscar detalhes do filme no TMDb.");
  }
}

export async function getPopularMovies(page: number = 1) {
  try {
    const { data } = await tmdbApi.get<TMDbSearchResponse>("/movie/popular", {
      params: {
        page,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes populares (getPopularMovies):", error);
    throw new Error("Falha ao buscar filmes populares no TMDb.");
  }
}

export async function getAllMoviesDetailsById(movieIds: number[]) {
  try {
    const movieDetailsPromises = movieIds.map((id) => getMovieDetails(id));
    const movieDetails = await Promise.all(movieDetailsPromises);

    return movieDetails;
  } catch (error) {
    console.error("Erro ao buscar filme (getAllMoviesDetailsById):", error);
    throw new Error("Falha ao buscar filmes.");
  }
}
