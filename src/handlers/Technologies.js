const { TechnologiesModel } = require("../model");
const Response = require("./Response");

class Technologies extends Response {
  addTech = async (req, res) => {
    try {
      const { techName } = req.body;
      if (!techName || typeof techName !== "string") {
        return this.sendResponse(req, res, {
          data: null,
          message: "Tech is Required of Type String",
          status: 400,
        });
      }

      // Normalize the tech name (convert to lowercase and remove underscores)
      const normalizedTechName = techName;

      // Check if a tech with the normalized name already exists in the database
      let techExist = await TechnologiesModel.findOne({
        techName: normalizedTechName,
      });
      if (techExist) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Tech already exists",
          status: 400,
        });
      }

      // Save the tech to the database
      const newTech = new TechnologiesModel({
        techName: normalizedTechName,
      });
      await newTech.save();

      return this.sendResponse(req, res, {
        data: null,
        message: "Tech added successfully",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        data: null,
        message: "Internal Server Error!",
        status: 500,
      });
    }
  };
  getTech = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the tech",
        });
      }
      // Find the tech by its id from
      const tech = await TechnologiesModel.findOne({ _id: id }).select("-__v");
      if (!tech) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No tech found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: tech,
        status: 200,
        message: "Tech fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getTechs = async (req, res) => {
    try {
      const tech = await TechnologiesModel.find({}).select("-__v");
      if (!tech) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No tech found }`,
        });
      }
      return this.sendResponse(req, res, {
        data: tech,
        status: 200,
        message: "Tech fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateTech = async (req, res) => {
    try {
      const tech = await TechnologiesModel.findByIdAndUpdate(
        req?.params?.id,
        {
          techName: req?.body?.techName ? req?.body?.techName : {},
        },
        { new: true }
      ).select("-__v");
      if (!tech) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No tech found with ${req?.params?.id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: tech,
        status: 200,
        message: "Tech fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
}
module.exports = { Technologies };
