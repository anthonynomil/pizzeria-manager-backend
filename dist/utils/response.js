"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res, status, data) => {
    res.status(status).send(data);
};
exports.response = response;
