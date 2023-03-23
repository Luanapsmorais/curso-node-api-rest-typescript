import { Request, RequestHandler, Response } from "express";

import * as yup from "yup";

interface ICity {
  name: string;
  state: string;
}

const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
  name: yup.string().required().min(5),
  state: yup.string().required().min(5),
});

//middleware:

export const createMiddlewareBodyValidator: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    await bodyValidation.validate(request.body);
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return response.json({
      errors: {
        default: yupError.message,
      },
    });
  }
};

export const create = async (
  request: Request<{}, {}, ICity>,
  response: Response
) => {
  console.log(request.body);

  return response.send("Created");
};

//essa função só será executada após o middleware ser executado! Primeiro passa pela validação (middleware), depois execução!
//Assim, a ordem da requisição é: CitiesController.createMiddlewareBodyValidator, e depois: CitiesController.create
// router.post(
//   "/cities",
//   CitiesController.createMiddlewareBodyValidator,
//   CitiesController.create
// );
