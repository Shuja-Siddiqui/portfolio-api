const { FileModel } = require("../model");
const Response = require("./Response");
const sharp = require("sharp");

class File extends Response {
  upload = async (req, res) => {
    try {
      console.log(req.files);
      if (!req.files) {
        return this.sendResponse(req, res, {
          message: "Upload the file/image",
          status: 200,
          data: null,
        });
      }
      const file = req.files.avatar;
      const { mimetype, data, name } = file;
      const temp = await sharp(data).webp({ quality: 20 }).toBuffer();
      const newFile = new FileModel({ mimetype, data: temp, name });
      const uploaded = await newFile.save();
      return this.sendResponse(req, res, {
        status: 201,
        data: uploaded?._id,
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getFile = async (req, res) => {
    try {
      const { id } = req?.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 405,
          message: "No Image Id Provided",
        });
      }
      const file = await FileModel.findOne({ _id: id });
      if (!file) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "File with given Id not found",
        });
      }
      res.setHeader("content-type", file?.mimetype);
      return res.status(200).send(file?.data);
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
}
module.exports = { File };
