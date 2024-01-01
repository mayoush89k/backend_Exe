import * as chai from "chai";
import { readBooksFromFile, writeBooksToFile } from "../models/bookModels.js";
import { createANewBook } from "../controllers/bookControllers.js";
const assert = chai.assert;

describe("books test suits ", () => {
  it("unit test for read book fn", (done) => {
    assert.isArray(readBooksFromFile());
    done();
  });
});
describe("integration tests for books endpoint", () => {
  it("testing GET /books endpoint", async (done) => {
    const result = await fetch("http://localhost:3000/books/");
    const data = await result.json();

    //assertions
    assert.isArray(data);
    done();
  });
});
describe("test post method", () => {
  const books = readBooksFromFile();
  const newBook = {
    title: "test",
    author: { name: "test" },
    coverImage: "test",
    genre: "test",
  };
  it("test writing on file", (done) => {
    writeBooksToFile([...books, newBook]);
    assert.strictEqual(books.length + 1, readBooksFromFile().length);
    assert.deepInclude(books[books.length], { title: "test" });
    after(() => {
      writeBooksToFile(books.filter((b) => b.title !== "test"));
    });
    done();
  });
  it.only("testing POST /books endpoint", async (done) => {
    const result = await fetch("http://localhost:3000/books/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const data = await result.json();
    writeBooksToFile([...books, data]);
    assert.strictEqual(books.length + 1, readBooksFromFile().length);
    done();
  });
});

describe("testing put method when updating the data", () => {
  const books = readBooksFromFile();
  const test = { id: 2 , title: "test" };
  it("testing when updating the file", (done) => {
    const updatedBooks = books.find(b => b.id == test.id)
    // ...
  });
});
