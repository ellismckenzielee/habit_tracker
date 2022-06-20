import express, { Express, Response, Request } from "express";
import { MongoClient, ObjectId, WithId } from "mongodb";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
const app: Express = express();
app.use(cors());
app.use(bodyParser());
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

app.post("/signup", async (req: Request, res: Response) => {
  const habitDb = client.db("habit_tracker");
  const users = habitDb.collection("users");
  const username = req.body.username!;
  const password = req.body.password!;
  console.log(username, password, "!");
  const hash = await bcrypt.hash(password, 10);
  const user = await users.insertOne({ username, password: hash });
  res.json(user);
});

app.get("/habits", async (req: Request, res: Response) => {
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  const result = await habits.find();
  result.toArray().then((data) => {
    res.send(data);
  });
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
