import { Request, Response } from "express";
import { deleteFavoriteMovie } from "../../services/userService";

export async function deleteFavoriteController(req: Request, res: Response) {
  const userId = req.query.userId as string;
  if (!userId) {
    return res
      .status(400)
      .json({ message: 'O query parameter "userId" é obrigatório.' });
  }

  const movieId = Number(req.params.movieId);
  if (isNaN(movieId)) {
    return res
      .status(400)
      .json({ message: 'O path parameter "movieId" deve ser um número.' });
  }

  try {
    await deleteFavoriteMovie(userId, movieId);

    res
      .status(200)
      .json({ message: "Filme removido dos favoritos com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Favorito não encontrado") {
        return res.status(404).json({ message: "Favorito não encontrado." });
      }
    }

    console.error("Erro ao remover favorito:", error);
    res.status(500).json({ message: "Erro interno ao remover favorito." });
  }
}
