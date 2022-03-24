"use strict";
// catController
import cats from "../models/catModel";

const cat_list_get = async (req, res) => {
  res.json(await cats.find());
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
  const color = req.body.color;
  const weight = req.body.weight;
  try {
    const cat = await cats.updateOne(
      { _id: req.params._id },
      { color, weight }
    );
    res.json(cat);
  } catch (error) {
    console.error(error);
  }
};

export { cat_list_get, cat_get, cat_post, cat_put };
