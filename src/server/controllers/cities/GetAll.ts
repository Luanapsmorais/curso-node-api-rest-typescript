import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middleware";

//creating a type for my query params:
interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

export const getAll = async (
  request: Request<{}, {}, {}, IQueryProps>,
  response: Response
) => {
  console.log(request.query);

  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(" controller is not ready yet!");
};
