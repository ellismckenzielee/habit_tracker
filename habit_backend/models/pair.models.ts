import { ObjectId } from "mongodb";
import { pairs } from "../db/db";
export const deletePairFromDB = async (pair_id: string) => {
  try {
    await pairs.deleteOne({ _id: new ObjectId(pair_id) });
    return;
  } catch (err) {
    return Promise.reject({ status: 404, message: "pair not found" });
  }
};

export const createPair = async (sender: string, recipient: string) => {
  try {
    await pairs.insertOne({ sender, recipient });
    return;
  } catch (err) {
    return Promise.reject({ status: 500, message: "pair creation went wrong" });
  }
};
