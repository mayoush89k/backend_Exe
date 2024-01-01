import { readBooksFromFile, writeBooksToFile } from "../models/bookModels.js";
import STATUS_CODES from "../constants/statusCodes.js";
import crypto from "crypto";

const getAllBooks = (req, res, next) => {
  try {
    const books = readBooksFromFile();
    res.send(books);
  } catch (error) {
    next(error);
  }
};
const getABook = (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const bookId = req.params.id;
    const book = books.find((b) => b.id == bookId);
    if (!book) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Book is not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};
const createANewBook = (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const {
      title,
      author,
      genre,
      pages,
      publishedIn,
      description,
      price,
      coverImage,
    } = req.body;
    if (!title || !author.name || !genre || !coverImage) {
      res.status(STATUS_CODES.BAD_REQUEST);
      throw new Error(
        "Missing data(title , author name, cover image or genre)"
      );
    }
    const id = books.length + 1;
    const newBook = {
      id,
      title,author,genre,
      pages: pages ? pages : crypto.randomInt(1000),
      publishedIn: publishedIn ? publishedIn : 1000 + crypto.randomInt(1023),
      description: description ? description : `description ${id}`,
      coverImage,
      price: price ? price : crypto.randomInt(20) + 0.90,
      reviews: [],
      averageRating: 0,
      readingProgress: 0,
    };
    books.push(newBook);
    writeBooksToFile(books);
    res.status(STATUS_CODES.CREATED).send(newBook);
  } catch (error) {
    next(error);
  }
};
const updateABook = (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const bookId = req.params.id;
    let book = books.find((b) => b.id == bookId);

    book = { ...book, ...req.body };
    books[bookId] = book;
    writeBooksToFile(books);

    res.send(book);
  } catch (error) {
    next(error);
  }
};
const deleteABook = (req, res, next) => {
  try {
    const books = readBooksFromFile();
    const booksAfterDelete = books.filter((book) => book.id != req.params.id);
    if (books.length == booksAfterDelete.length) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Book is not found");
    }
    writeBooksToFile(booksAfterDelete);
    res.status(STATUS_CODES.OK).send(booksAfterDelete);
  } catch (error) {
    next(error);
  }
};

export { getAllBooks, getABook, createANewBook, updateABook, deleteABook };
