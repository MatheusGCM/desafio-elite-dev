import { Router } from "express";
import { registerUserController } from "../controller/user/register-user-controller";
import {
  addFavoriteController,
  deleteFavoriteController,
  getFavoritesController,
  getFavoritesIdsController,
} from "../controller/favorite";
import { createLinkShareFavoritesController } from "../controller/favorite/create-link-share-favorites-controller";

const userRouter = Router();

userRouter.post("/register", registerUserController);

userRouter.post("/favorites", addFavoriteController);
userRouter.get("/favorites", getFavoritesController);
userRouter.get("/favorites/ids", getFavoritesIdsController);
userRouter.delete("/favorites/:movieId", deleteFavoriteController);

userRouter.post("/favorites/share", createLinkShareFavoritesController);

export default userRouter;
