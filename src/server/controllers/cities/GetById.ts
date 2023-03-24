import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

//creating a type for my query params:
interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (
  request: Request<IParamProps>,
  response: Response
) => {
  console.log(request.params);

  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(" Id controller is not ready yet!");
};
