import jwt from "jsonwebtoken";
import { AuthResponse } from "@/src/app/api/login/types";
import { pbkdf2Sync } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET as string;

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const authenticate = (req: any): AuthResponse => {
  const token = req.headers.get("authorization").split(" ")[1];
  const verified = verifyToken(token) as any;
  if (!verified) throw Error("Failed to verify session token");
  return {
    token,
    user_id: verified?.user_id,
    exp: verified?.exp,
    iat: verified?.iat,
  };
};

const hashPassword = (password: string, salt: string) => {
  const iterations = 10000;
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512");

  return {
    salt: salt,
    hash: hash.toString("hex"),
    iterations: iterations,
  };
};

export { verifyToken, authenticate, hashPassword };
