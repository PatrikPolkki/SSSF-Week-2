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

catSchema.query.byGender = function (gender) {
  return this.find(gender ? { gender } : {});
};

catSchema.query.olderThan = function (age) {
  return this.find(
    age
      ? {
          birthdate: {
            $gte: new Date(
              new Date().setFullYear(new Date().getFullYear() - age)
            ),
          },
        }
      : {}
  );
};

catSchema.query.heavierThan = function (weight) {
  return this.find(weight ? { weight: { $gte: weight } } : {});
};

export default mongoose.model("cat", catSchema);
