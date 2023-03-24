import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IParamProps {
  id?: number;
}

interface IBodyProps {
  name: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(5),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  request: Request<IParamProps, {}, IBodyProps>,
  response: Response
) => {
  console.log(request.params);
  console.log(request.body);

  return response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(" updateById controller is not ready yet!");
};
