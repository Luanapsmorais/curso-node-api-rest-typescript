import { Request, Response } from "express";

interface ICity {
  name: string;
}

export const create = (request: Request<{}, {}, ICity>, response: Response) => {
  console.log(request.body);

  return response.send("create");
};
