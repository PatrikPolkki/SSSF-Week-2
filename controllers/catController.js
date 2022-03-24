"use strict";
// catController
import cats from "../models/catModel";

const cat_list_get = async (req, res) => {
  console.log("query", req.query);
  const gender = req.query.gender;
  const weight = req.query.weight;
  const age = req.query.age;

  try {
    const result = await cats
      .find()
      .byGender(gender)
      .olderThan(age)
      .heavierThan(weight);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const cat_get = async (req, res) => {
  try {
    const cat = await cats.findById(req.params.id);
    res.send(cat);
  } catch (error) {
    console.error(error);
  }
};

const cat_post = async (req, res) => {
  console.log(req.body);
  const newCat = req.body;
  newCat.filename = req.file.filename;
  try {
    await cats.create(newCat);
    res.json(newCat);
  } catch (e) {
    console.log(e);
  }
};

const cat_put = async (req, res) => {
  console.log(req.body);
  try {
    const color = req.body.color;
    const weight = req.body.weight;
    const name = req.body.name;
    const cat = await cats.updateOne(
      { _id: req.params.id },
      { color, weight, name }
    );
    res.json(cat);
  } catch (error) {
    console.log(error);
  }
};

const cat_delete = async (req, res) => {
  try {
    res.json(await cats.deleteOne({ _id: req.params.id }));
  } catch (e) {
    res.json(e);
  }
};

export { cat_list_get, cat_get, cat_post, cat_put, cat_delete };
