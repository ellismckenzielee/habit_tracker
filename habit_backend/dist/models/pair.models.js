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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPair = exports.deletePairFromDB = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../db/db");
const deletePairFromDB = (pair_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pairs.deleteOne({ _id: new mongodb_1.ObjectId(pair_id) });
        return;
    }
    catch (err) {
        return Promise.reject({ status: 404, message: "pair not found" });
    }
});
exports.deletePairFromDB = deletePairFromDB;
const createPair = (sender, recipient) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.pairs.insertOne({ sender, recipient });
        return;
    }
    catch (err) {
        return Promise.reject({ status: 500, message: "pair creation went wrong" });
    }
});
exports.createPair = createPair;
