"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = client;
