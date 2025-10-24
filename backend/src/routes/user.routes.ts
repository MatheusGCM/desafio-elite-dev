import { Router } from "express";
import { registerUserController } from "../controller/user/register-user-controller";
import {
  addFavoriteController,
  deleteFavoriteController,
  getFavoriteController,
} from "../controller/favorite";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/favorites", addFavoriteController);
userRouter.get("/favorites", getFavoriteController);
userRouter.delete("/favorites/:movieId", deleteFavoriteController);

export default userRouter;
