import express from "express";
import "dotenv/config";
import cors from "cors";
import transactionsRoute from "./routes/transactionsRoute";
import rateLimiter from "./middlewares/rateLimiter";
import errorHandler from "./middlewares/errorHandler";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(rateLimiter);
const PORT = process.env.PORT || 3000;
app.use("/api/transactions", transactionsRoute);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
