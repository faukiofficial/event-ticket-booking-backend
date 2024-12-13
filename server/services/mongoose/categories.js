const { BadRequestError, NotFoundError } = require("../../errors/index.js");
const Category = require("../../api/categories/model.js");

exports.createCategoryService = async (req) => {
  const { name } = req.body;

  const isCategoryExist = await Category.findOne({
    name,
    organizer: req.user.organizer,
  });

  if (isCategoryExist) {
    throw new BadRequestError("Category already exist");
  }

  const category = await Category.create({
    name,
    organizer: req.user.organizer,
  });

  return category;
};

exports.getAllCategoriesService = async (req) => {
  console.log(req.user);
  const categories = await Category.find({
    organizer: req.user.organizer,
  }).populate("organizer");

  if (categories.length === 0) {
    throw new NotFoundError("No categories found");
  }

  return categories;
};

exports.getSingleCategoryService = async (req, id) => {
  const category = await Category.findOne({
    _id: id,
    organizer: req.user.organizer,
  }).populate("organizer");

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};

exports.updateCategoryService = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const isIdExist = await Category.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!isIdExist) {
    throw new NotFoundError("Category not found");
  }

  const isCategoryExist = await Category.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });
  if (isCategoryExist) {
    throw new BadRequestError("Category already exist");
  }

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  return category;
};

exports.deleteCategoryService = async (req) => {
  const { id } = req.params;

  const category = await Category.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!category) {
    throw new NotFoundError("Category not found");
  }

  await Category.findOneAndDelete({ _id: id });

  return category;
};

exports.checkCategoryService = async (id) => {
  const category = await Category.findOne({ _id: id });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};
