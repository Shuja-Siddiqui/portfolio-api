const { ServicesModel } = require("../model");
const Response = require("./Response");

class Services extends Response {
  addService = async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!description || !name) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Service is Required of Type String",
          status: 400,
        });
      }
      // Normalize the skill name (convert to lowercase and remove underscores)
      const normalizedServiceName = name
        .toLowerCase()
        .replace(/_/g, "")
        .replace(/\s+/g, "");

      // Check if a skill with the normalized name already exists in the database
      let skillExist = await ServicesModel.findOne({
        serviceName: normalizedServiceName,
      });
      if (skillExist) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Skill already exists",
          status: 400,
        });
      }
      // Save the service to the database
      const newTestservice = new ServicesModel({
        name: normalizedServiceName,
        description,
      });
      await newTestservice.save();

      return this.sendResponse(req, res, {
        data: null,
        message: "Service added successfully",
        status: 201,
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
  getService = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the service",
        });
      }
      // Find the service by its id from
      const service = await ServicesModel.findOne({ _id: id })
        .populate({
          path: "name",
          select: "skillName",
        })
        .select("-__v");
      if (!service) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No service found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: service,
        status: 200,
        message: "Testservice fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getServices = async (req, res) => {
    try {
      const service = await ServicesModel.find({})
      .select("-__v");
      if (!service) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No service found`,
        });
      }
      return this.sendResponse(req, res, {
        data: service,
        status: 200,
        message: "Testservice fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateService = async (req, res) => {
    try {
      const service = await ServicesModel.findByIdAndUpdate(
        req?.params?.id,
        {
          description: req?.body.description,
          name: req?.body?.name,
        },
        { new: true }
      ).select("-__v");
      if (!service) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No service found with the given ${req?.params?.id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: service,
        status: 200,
        message: "Testservice updated",
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
module.exports = { Services };
