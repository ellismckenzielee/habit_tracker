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
const db_1 = __importDefault(require("./db/db"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authentication_1 = __importDefault(require("./authentication/authentication"));
const errors_routes_1 = require("./routes/errors.routes");
const secret = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = process.env.PORT;
// passport.use(
//   new JwtStrategy(opts, async function (jwt_payload, done) {
//     console.log("JWT PAYLOAD", jwt_payload);
//     const habitDb = client.db("habit_tracker");
//     const users = habitDb.collection("users");
//     done("error", false);
//     const foundUser = await users.findOne({ id: jwt_payload.sub });
//     console.log(foundUser);
//   })
// );
app.get("/", authentication_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("root path");
    const habitDb = db_1.default.db("habit_tracker");
    console.log("root path finished");
    res.send({ success: "reached root" });
}));
app.post("/", authentication_1.default.authenticate("local", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("root path");
    const habitDb = db_1.default.db("habit_tracker");
    console.log("root path finished");
    res.send({ success: "reached root" });
}));
app.use("/user", user_routes_1.default);
app.get("/habits", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habitDb = db_1.default.db("habit_tracker");
    const habits = habitDb.collection("habits");
    const result = yield habits.find();
    result.toArray().then((data) => {
        res.send(data);
    });
}));
app.use(errors_routes_1.handle500);
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
}
exports.default = app;
