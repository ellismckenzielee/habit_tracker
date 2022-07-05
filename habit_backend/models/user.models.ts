import bcrypt from "bcryptjs";
import { users } from "../db/db";

export const handleSignup = async (username: string, password: string) => {
  const foundUser = await users.findOne({ username });
  if (foundUser)
    return Promise.reject({ status: 409, message: "username already exists" });
  const hash = await bcrypt.hash(password, 10);
  const user = await users.insertOne({ username, password: hash });
  return user;
};
