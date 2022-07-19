import { MongoClient } from "mongodb";
const host = process.env.NODE_ENV === "test" ? "localhost" : "mongo";
const url = `mongodb://root:example@${host}:27017/?maxPoolSize=20&w=majority`;
const client = new MongoClient(url);
function connect() {
  client
    .connect()
    .then(() => {
      console.log("mongo connected");
    })
    .catch((err) => {
      console.log("ERROR connecting to mongo!", err);
    });
}
if (process.env.NODE_ENV !== "test") {
  console.log("connecting to db");
  connect();
}

const habitDb = client.db(
  process.env.NODE_ENV === "test" ? "test" : "habit_tracker"
);
const users = habitDb.collection("users");
const habits = habitDb.collection("habits");
const weeks = habitDb.collection("weeks");
const pairs = habitDb.collection("pairs");
export { habitDb, users, habits, weeks, pairs };
export default client;
