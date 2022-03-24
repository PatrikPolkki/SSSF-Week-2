"use strict";
import express from "express";
import catRoute from "./routes/catRoute";
import userRoute from "./routes/userRoute";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import passport from "./utils/pass.js";
import db from "./utils/db";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize({}));
const port = 3000;

app.use("/auth", authRoute);

app.use("/cat", catRoute);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);

db.on("connected", () => {
  app.listen(port, () => {
    console.log(`app listen on port ${port}`);
  });
});
