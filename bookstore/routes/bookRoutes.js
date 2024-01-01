import { Router } from "express";
import {
  createANewBook,
  deleteABook,
  getABook,
  getAllBooks,
  updateABook,
} from "../controllers/bookControllers.js";

const router = Router();

router.route("/").get(getAllBooks).post(createANewBook);

router.route("/:id").get(getABook).put(updateABook).delete(deleteABook);

export default router;
