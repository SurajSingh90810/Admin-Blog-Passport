const Category = require("../model/category.model");
const path = require("path");
const fs = require("fs");

const categoryPage = (req, res) => {
  return res.render("category/add_category");
};

const categoryRegister = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    req.body.categoryImage = imagePath;
    let category = await Category.create(req.body);

    return res.redirect("/category/view-category");
  } catch (error) {
    console.log(error);
  }
};

const viewCategories = async (req, res) => {
  try {
    let categories = await Category.find({});
    res.render("category/view_category", { categories });
  } catch (error) {
    console.error(error);
  }
};

const editCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    return res.render("category/edit_category", { categories: category });
  } catch (error) {
    console.error(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (category) {
      if (req.file) {
        if (category.categoryImage != "") {
          let imagePath = path.join(__dirname, "..", category.categoryImage);
          try {
            await fs.unlinkSync(imagePath);
          } catch (error) {
            console.log("File misssing...");
          }
        }
        let filePath = `/uploads/${req.file.filename}`;
        req.body.categoryImage = filePath;
      }
      await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.redirect("/category/view-category");
    } else {
      console.log("Admin not Found....");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

const deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (category) {
      if (category.categoryImage != "") {
        let imagePath = path.join(__dirname, "..", category.categoryImage);
        try {
          await fs.unlinkSync(imagePath);
        } catch (error) {
          console.log("File misssing...");
        }
      }
      await Category.findByIdAndDelete(id);
      return res.redirect("/category/view-category");
    } else {
      return res.redirect("/category/view-category");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/category/view-category");
  }
};

module.exports = {
  categoryPage,
  categoryRegister,
  viewCategories,
  editCategory,
  updateCategory,
  deleteCategory
};
