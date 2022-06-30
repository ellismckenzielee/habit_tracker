import bcrypt from "bcryptjs";
import { habits, users } from "../db/db";
export const handleSignup = async (username: string, password: string) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await users.insertOne({ username, password: hash });
  return user;
};
