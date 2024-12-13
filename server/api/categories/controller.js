const {
  createCategoryService,
  getAllCategoriesService,
  getSingleCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../../services/mongoose/categories.js");
const { StatusCodes } = require("http-status-codes");

// create category
exports.createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryService(req, res);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesService(req);

    return res.status(StatusCodes.OK).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// get single category
exports.getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getSingleCategoryService(req, id);

    return res.status(StatusCodes.OK).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

// update category name
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await updateCategoryService(req);

    return res.status(StatusCodes.OK).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

// delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await deleteCategoryService(req);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Category deleted successfully",
      deleted: category,
    });
  } catch (error) {
    next(error);
  }
};
