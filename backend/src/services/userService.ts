import { prisma } from "../lib/prisma";

export async function createUser(name: string) {
  return prisma.user.create({
    data: {
      name,
    },
  });
}

async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function favoriteMovie(userId: string, movieId: number) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return prisma.favorite.create({
    data: {
      userId: userId,
      movieId: movieId,
    },
  });
}

export async function getFavoritesMovie(userId: string) {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteFavoriteMovie(userId: string, movieId: number) {
  const hasFavorite = await prisma.favorite.findUnique({
    where: {
      userId_movieId: { userId: userId, movieId: movieId },
    },
  });

  if (!hasFavorite) {
    throw new Error("Favorito não encontrado");
  }

  return await prisma.favorite.delete({
    where: {
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });
}
