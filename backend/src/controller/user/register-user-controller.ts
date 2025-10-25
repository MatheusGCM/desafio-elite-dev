import { Request, Response } from "express";
import { createUser } from "../../services/userService";

export async function registerUserController(req: Request, res: Response) {
  const { name } = req.body as { name: string };
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
  }

  try {
    const results = await createUser(name);
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
