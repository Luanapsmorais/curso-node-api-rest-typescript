import express from "express";

const server = express();

//iniciando rotas:

server.get("/", (request, response) => {
  return response.send("Olá, Luana!");
});

export { server };
