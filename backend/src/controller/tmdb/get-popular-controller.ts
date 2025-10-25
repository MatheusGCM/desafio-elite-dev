import { Request, Response } from "express";
import { getPopularMovies } from "../../services/tmdbService";

export async function getPopularMovieController(req: Request, res: Response) {
  const page = req.query.page as number | undefined;

  try {
    const results = await getPopularMovies(page);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
