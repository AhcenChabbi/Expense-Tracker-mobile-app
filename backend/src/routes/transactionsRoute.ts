import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "../controllers/transactionsController";

const router = Router();
router.post("/", createTransaction);
router.get("/", getTransactionsByUserId);
router.get("/summary", getSummaryByUserId);
router.delete("/:id", deleteTransaction);
export default router;
