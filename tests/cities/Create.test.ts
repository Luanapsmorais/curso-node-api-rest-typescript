import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
  it("Create register", async () => {
    const firstTestResponse = await testServer.post("/cities").send({
      name: "Bauru",
    });

    expect(firstTestResponse.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof firstTestResponse.body).toEqual("string");
  });

  it("Create register while testing yup validation!", async () => {
    const firstTestResponse = await testServer.post("/cities").send({
      name: "Ba",
    });

    expect(firstTestResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstTestResponse.body).toHaveProperty("errors.body.name");
  });

  it("testing tests!", async () => {
    const firstTestResponse = await testServer.post("/cities").send({
      name: "Bauru",
    });

    // expect(firstTestResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstTestResponse.body).toMatch("Bauru");
  });

  it("Testing empty city name", async () => {
    const firstTestResponse = await testServer.post("/cities").send({});

    expect(firstTestResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(firstTestResponse.body).toEqual("provide the name of the city");
  });

  it("Testing same city name, returns message that says: city's name is taken", async () => {
    const cityName = "São Paulo";
    const firstTestResponse = await testServer
      .post("/cities")
      .send({ name: cityName });

    const response = await testServer.post("/cities").send({ name: cityName });

    expect(firstTestResponse.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.name).toEqual(
      "the name of the city is already taken"
    );
  });
});
