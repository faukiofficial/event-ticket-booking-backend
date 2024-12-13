const NotFoundError = require("../../errors/not-found.js");
const Image = require("../../api/images/model.js");
const path = require("path");
const fs = require("fs");

exports.generateUrlImage = async (req) => {
  const url = `/uploads/${req.file.filename}`;

  return url;
};

exports.createImageService = async (req) => {
  const url = await Image.create({
    url: req.file
      ? `/uploads/${req.file.filename}`
      : "/uploads/avatar/default.png",
  });

  return url;
};

exports.getSingleImageService = async (id) => {
  const image = await Image.findOne({ _id: id });
  
  if (!image) {
    throw new NotFoundError("Image not found");
  }

  return image;
};

// Delete Image Service
exports.deleteImageService = async (req) => {
  const { id } = req.params;

  const image = await Image.findOne({ _id: id });

  if (!image) {
      throw new NotFoundError("Image not found");
  }

  const filePath = path.join(__dirname, "../../uploads", path.basename(image.url));

  if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
  }

  await Image.deleteOne({ _id: id });

  return image;
};
