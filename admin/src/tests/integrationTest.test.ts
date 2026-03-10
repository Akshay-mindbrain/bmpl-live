import supertest from "supertest";
import { createServer } from "../server";

describe("Health endpoint tests", () => {
  test("Health endpoint returns ok 200", async () => {
    await supertest(createServer())
      .get("/v1/health")
      .expect(200)
      .then((res) => {
        expect(res.body.status).toBe("success");
      });
  });
});
