// Router é um middleware, onde escifico todas as rotas
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (request, response) => {
  return response.send("Olá, Luana!");
});

// teste de outra rota - funcionou!
router.post("/teste", (request, response) => {
  console.log(request.body);
  return response.status(StatusCodes.UNAUTHORIZED).json(request.body);
});

export { router };
