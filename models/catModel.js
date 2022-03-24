"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: { type: String, minlength: [2, "sorry, your cat can't be called Z"] },
  birthday: { type: Date, max: [Date.now, "cat from the future?"] },
  gender: { type: String, enum: ["male", "female"] },
  color: { type: String },
  filename: String,
  weight: {
    type: Number,
    min: [0, "must be bigger than 0"],
    max: [20, "must be smaller than 20"],
  },
});

export default mongoose.model("cat", catSchema);
