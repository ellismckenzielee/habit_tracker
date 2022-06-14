import express, { Express, Response, Request } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
const app: Express = express();
app.use(cors());
const port: string = process.env.PORT!;
const url = process.env.DB_URL!;
console.log(process.env.PORT, process.env.DB_URL);
const client = new MongoClient(url);

app.get("/", async (req: Request, res: Response) => {
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  const result = await habits.insertOne({ name: "trello" });
  console.log(result);
  res.send("You have reached the / path!!!");
});

app.get("/habits", async (req: Request, res: Response) => {
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  const result = await habits.findOne({ name: "trello" });
  console.log(result);
  res.json(result);
});
client
  .connect()
  .then(() => {
    console.log("connected");
  })
  .catch(console.log);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
