import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICity {
  name: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(
    yup.object().shape({
      name: yup.string().required().min(5),
    })
  ),
}));

export const create = async (
  request: Request<{}, {}, ICity>,
  response: Response
) => {
  console.log(request.body);

  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("City controller is not ready yet!");
};
