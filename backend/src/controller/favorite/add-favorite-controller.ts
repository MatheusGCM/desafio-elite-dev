import { Request, Response } from "express";
import { favoriteMovie } from "../../services/userService";

export async function addFavoriteController(req: Request, res: Response) {
  const { userId, movieId } = req.body;

  if (!userId || typeof userId !== "string") {
    return res
      .status(400)
      .json({ message: 'O campo "userId" (string) é obrigatório.' });
  }
  if (!movieId || typeof movieId !== "number") {
    return res
      .status(400)
      .json({ message: 'O campo "movieId" (number) é obrigatório.' });
  }

  try {
    const newFavorite = await favoriteMovie(userId, movieId);
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ message: error.message });
      }
    }

    res.status(500).json({ message: "Erro interno ao adicionar favorito." });
  }
}
