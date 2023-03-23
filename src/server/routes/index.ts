// Router é um middleware, onde escifico todas as rotas
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (request, response) => {
  return response.send("Olá, Luana!");
});

router.post(
  "/cities",
  CitiesController.createMiddlewareBodyValidator,
  CitiesController.create
);

export { router };
