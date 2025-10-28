import { Request, Response } from "express";
import { searchMovies } from "../../services/tmdbService";

export async function searchMovieController(req: Request, res: Response) {
  const query = req.query.q as string;
  const page = req.query.page as number | undefined;

  if (!query) {
    return res.status(400).json({ message: 'O parâmetro "q" é obrigatório.' });
  }

  try {
    const results = await searchMovies(query, page);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
