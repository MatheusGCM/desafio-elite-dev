import { Router } from "express";
import {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
} from "../services/tmdbService";

const router = Router();

router.get("/search", async (req, res) => {
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
});

router.get("/movies/popular", async (req, res) => {
  const page = req.query.page as number | undefined;

  try {
    const results = await getPopularMovies(page);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "ID do filme inválido." });
    }

    const results = await getMovieDetails(movieId);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
