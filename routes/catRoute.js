"use strict";
// catRoute
import { Router } from "express";
import multer from "multer";
import {
  cat_list_get,
  cat_get,
  cat_post,
  cat_put,
} from "../controllers/catController";

const upload = multer({ dest: "./uploads" });
const router = Router();

router.get("/", cat_list_get);

router.get("/:id", cat_get);

router.post("/", upload.single("cat"), cat_post);

router.put("/:id", cat_put);

export default router;
