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
    const result = await pairs.findOne({
      $or: [{ sender: sender }, { recipient: sender }],
    });
    if (result)
      return Promise.reject({
        status: 409,
        message: "pair creation went wrong - pair already exists",
      });
    else {
      await pairs.insertOne({ sender, recipient, status: "pending" });
      return;
    }
  } catch (err) {
    return Promise.reject({ status: 500, message: "pair creation went wrong" });
  }
};

export const updatePair = async (pair_id: string) => {
  try {
    console.log(pair_id);
    const result = await pairs.updateOne(
      { _id: new ObjectId(pair_id) },
      { $set: { status: "accepted" } }
    );
    return;
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "something went wrong during update",
    });
  }
};
