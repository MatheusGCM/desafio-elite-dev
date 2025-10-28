import { Request, Response } from "express";
import {
  createSharedList,
  getFavoritesMovie,
} from "../../services/userService";

export async function createLinkShareFavoritesController(
  req: Request,
  res: Response
) {
  const { userId } = req.body as { userId: string };
  if (!userId) {
    return res.status(400).json({ message: 'O campo "userId" é obrigatório.' });
  }

  try {
    const userFavorites = await getFavoritesMovie(userId);

    if (userFavorites.length === 0) {
      return res
        .status(400)
        .json({ message: "Você não tem favoritos para compartilhar." });
    }

    const movieIds = userFavorites.map((fav) => fav.movieId);

    const newSharedList = await createSharedList(userId, movieIds);

    res.status(201).json({
      message: "Lista de compartilhamento criada com sucesso!",
      shareId: newSharedList.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
    }

    console.error("Erro ao criar lista de compartilhamento:", error);
    res
      .status(500)
      .json({ message: "Erro interno ao criar lista de compartilhamento." });
  }
}
