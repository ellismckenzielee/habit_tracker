"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT;
const url = process.env.DB_URL;
console.log(process.env.PORT, process.env.DB_URL);
const client = new mongodb_1.MongoClient(url);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitDb = client.db("habit_tracker");
    const habits = habitDb.collection("habits");
    const result = yield habits.insertOne({ name: "trello" });
    console.log(result);
    res.send("You have reached the / path!!!");
}));
app.get("/habits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitDb = client.db("habit_tracker");
    const habits = habitDb.collection("habits");
    const result = yield habits.findOne({ name: "trello" });
    console.log(result);
    res.json(result);
}));
client
    .connect()
    .then(() => {
    console.log("connected");
})
    .catch(console.log);
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
