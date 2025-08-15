import { Request, Response } from "express";
import { JwtPayload, verifyToken } from "./jwt";

export const createContext = ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  const token = req.headers.authorization?.split(" ")[1];
  let user: JwtPayload | null = null;
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      user = decoded;
    }
  }

  return { user };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
