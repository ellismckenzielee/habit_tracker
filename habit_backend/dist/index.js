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
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const error_controllers_1 = require("./controllers/error.controllers");
const pair_routes_1 = __importDefault(require("./routes/pair.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = process.env.PORT || "";
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("reached / endpoint");
    try {
        res.send("reached root");
    }
    catch (err) {
        next();
    }
}));
app.use("/user", user_routes_1.default);
app.use("/pair", pair_routes_1.default);
app.use(error_controllers_1.handleErrors);
app.use(error_controllers_1.handle500);
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
}
exports.default = app;
