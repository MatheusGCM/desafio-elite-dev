import { Request, Response } from "express";
import { searchMovies } from "../../services/tmdbService";

export async function searchMovieController(req: Request, res: Response) {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ message: 'O parâmetro "q" é obrigatório.' });
  }

  try {
    const results = await searchMovies(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
