import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (request, response) => {
  return response.send("Hello, Luana!");
});

router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);

export { router };
