import { Request, Response } from "express";
import { getSharedList } from "../../services/userService";
import { getAllMoviesDetailsById } from "../../services/tmdbService";

export async function getSharedFavoriteMoviesController(
  req: Request,
  res: Response
) {
  const { shareId } = req.params as { shareId: string };
  if (!shareId) {
    return res
      .status(400)
      .json({ message: 'O "shareId" é obrigatório na URL.' });
  }

  try {
    const sharedList = await getSharedList(shareId);

    if (!sharedList) {
      return res
        .status(404)
        .json({ message: "Lista de compartilhamento não encontrada." });
    }

    const movieIds = sharedList.movieIds;

    if (movieIds.length === 0) {
      return res.status(200).json([]);
    }
    const movieDetails = await getAllMoviesDetailsById(movieIds);

    res.status(200).json(movieDetails);
  } catch (error) {
    console.error("Erro ao buscar lista de compartilhamento:", error);

    if (error instanceof Error) {
      if (error.message === "Falha ao buscar filmes.") {
        return res.status(400).json({ message: error.message });
      }
    }

    res
      .status(500)
      .json({ message: "Erro interno ao buscar lista de compartilhamento." });
  }
}
