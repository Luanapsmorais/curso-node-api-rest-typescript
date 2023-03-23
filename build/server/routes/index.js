"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Router é um middleware, onde escifico todas as rotas
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (request, response) => {
    return response.send("Olá, Luana!");
});
// teste de outra rota - funcionou!
router.post("/teste", (request, response) => {
    console.log(request.body);
    return response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(request.body);
});
