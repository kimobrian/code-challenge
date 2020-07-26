const supertest = require("supertest");
const app = require("../app");

describe("API Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  it("should return a welcome message", async () => {
    const res = await request.get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ "message": "Welcome to User Locks!!" });
  });
});