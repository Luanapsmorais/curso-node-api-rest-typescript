import { Request, RequestHandler, Response } from "express";

import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICity {
  name: string;
  state: string;
}

interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(
    yup.object().shape({
      name: yup.string().required().min(5),
      state: yup.string().required().min(5),
    })
  ),
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().required().min(3),
    })
  ),
}));

export const create = async (
  request: Request<{}, {}, ICity>,
  response: Response
) => {
  console.log(request.body);

  return response.send("Created");
};
