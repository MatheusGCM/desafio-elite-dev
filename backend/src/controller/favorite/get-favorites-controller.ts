import { Request, Response } from "express";
import { getFavoritesMovie } from "../../services/userService";
import { getAllMoviesDetailsById } from "../../services/tmdbService";

export async function getFavoritesController(req: Request, res: Response) {
  const userId = req.query.userId as string;

  if (!userId || typeof userId !== "string") {
    return res
      .status(400)
      .json({ message: 'O parâmetro "userId" (string) é obrigatório.' });
  }

  try {
    const favorites = await getFavoritesMovie(userId);

    if (favorites.length === 0) {
      return res.status(200).json([]);
    }

    const movieIds = favorites.map((fav) => fav.movieId);

    const movieDetails = await getAllMoviesDetailsById(movieIds);

    res.status(200).json(movieDetails);
  } catch (error) {
    console.error("Erro ao listar favoritos:", error);
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === "Falha ao buscar filmes.") {
        return res.status(400).json({ message: error.message });
      }
    }
    res.status(500).json({ message: "Erro interno ao listar favoritos." });
  }
}
