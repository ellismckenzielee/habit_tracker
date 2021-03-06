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
exports.putPair = exports.postPair = exports.deletePair = void 0;
const pair_models_1 = require("../models/pair.models");
const deletePair = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in deletePair function");
    const { pair_id } = req.params;
    try {
        yield (0, pair_models_1.deletePairFromDB)(pair_id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});
exports.deletePair = deletePair;
const postPair = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in postPair function");
    const { sender, recipient } = req.body;
    console.log(sender, recipient);
    try {
        yield (0, pair_models_1.createPair)(sender, recipient);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});
exports.postPair = postPair;
const putPair = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(" inside putPair function");
    const { pair_id } = req.params;
    console.log(pair_id);
    try {
        yield (0, pair_models_1.updatePair)(pair_id);
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
});
exports.putPair = putPair;
