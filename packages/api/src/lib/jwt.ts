import jwt from "jsonwebtoken";
import { settings } from "./settings";

export interface JwtPayload {
  userId: string;
  projectId: string | null;
}

const JWT_SECRET = settings.jwt_secret;

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
