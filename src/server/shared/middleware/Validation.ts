import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TFieldValidation = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: Schema<T>) => Schema<any>;

type TAllSchemas = Record<TFieldValidation, Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (request, response, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(request[key as TFieldValidation], {
          abortEarly: false,
        });
      } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (error.path === undefined) return;
          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;

        // return response.status(StatusCodes.BAD_REQUEST).json({ errors });
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errorsResult });
    }
  };

//validateSync returns error or success, unlike validate, that returns a promise (even if there's an error)
