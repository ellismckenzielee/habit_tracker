"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.habits = exports.users = exports.habitDb = void 0;
const mongodb_1 = require("mongodb");
const host = process.env.NODE_ENV === "test" ? "localhost" : "mongo";
const url = `mongodb://root:example@${host}:27017/?maxPoolSize=20&w=majority`;
const client = new mongodb_1.MongoClient(url);
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
const habitDb = client.db("habit_tracker");
exports.habitDb = habitDb;
const users = habitDb.collection("users");
exports.users = users;
const habits = habitDb.collection("habits");
exports.habits = habits;
exports.default = client;
