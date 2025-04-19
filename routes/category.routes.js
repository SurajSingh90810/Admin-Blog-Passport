const express = require("express");
const categoryController = require("../controller/category.controller");
const Category = require("../model/category.model");

const route = express.Router();

route.get("/add-category", categoryController.categoryPage);
route.post(
  "/add-category",
  Category.uploadImage,
  categoryController.categoryRegister
);
route.get("/view-category", categoryController.viewCategories);
route.get("/edit-category/:id", categoryController.editCategory);
route.post(
  "/update-category/:id",
  Category.uploadImage,
  categoryController.updateCategory
);

route.get("/delete-category/:id", categoryController.deleteCategory);

module.exports = route;
