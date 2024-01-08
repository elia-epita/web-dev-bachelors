import { expect } from "chai";

// importing the function that we will be using from the todo.service
import { getTodos, addTodo } from "../services/todo.service.js";

describe("getTodos function", () => {
  it("should return an empty list of todos", () => {
    const req = {};
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        // Assert that the response status code is 200
        expect(res.statusCode).to.equal(200);

        // Assert that the returned data is an empty array
        expect(data).to.eql([]);
      },
    };

    // calling the function with the mocked request and response
    getTodos(req, res);
  });
});

describe("addTodo", () => {
  it("should throw an error", () => {
    const req = {
      body: {},
    };
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        expect(res.statusCode).to.equal(400);
      },
    };
    addTodo(req, res);
  });
  it("should add a todo to the list", () => {
    const req = {
      body: {
        todo: "New todo",
      },
    };
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        expect(res.statusCode).to.equal(300);

        expect(data).to.eql(["New todo"]);
      },
    };

    addTodo(req, res);
  });
});
