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
exports.connectToDb = exports.associate = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "joe",
    password: "sail",
    database: "postgres",
});
const associate = () => {
    // TODO Make associations here
};
exports.associate = associate;
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.sequelize.authenticate();
    yield exports.sequelize.sync();
    (0, exports.associate)();
});
exports.connectToDb = connectToDb;
