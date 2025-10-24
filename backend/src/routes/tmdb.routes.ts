import { Router } from "express";

import {
  getMovieDetailsController,
  getPopularMovieController,
  searchMovieController,
} from "../controller/tmdb";

const tmdbRouter = Router();

tmdbRouter.get("/search", searchMovieController);
tmdbRouter.get("/movies/popular", getPopularMovieController);
tmdbRouter.get("/movies/:id", getMovieDetailsController);

export default tmdbRouter;
