import { Router } from "express";
import userRouter from "./user.routes";
import tmdbRouter from "./tmdb.routes";

const mainRouter = Router();

// api/v1/user
mainRouter.use("/user", userRouter);
// api/v1/tmdb
mainRouter.use("/tmdb", tmdbRouter);

export default mainRouter;
