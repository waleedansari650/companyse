import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connection from "./config/db";
import clientRoutes from "./routes/clientRoute";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
connection();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(
    `Server is runnning on PORT :  ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});

app.use("/api/client/", clientRoutes);
process.on("unhandledRejection", (err: any) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
