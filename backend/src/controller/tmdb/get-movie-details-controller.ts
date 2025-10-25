import { Request, Response } from "express";
import { getMovieDetails } from "../../services/tmdbService";

export async function getMovieDetailsController(req: Request, res: Response) {
  try {
    const movieId = Number(req.params.id);
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "ID do filme inválido." });
    }

    const results = await getMovieDetails(movieId);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
