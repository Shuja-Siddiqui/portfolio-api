const { ServicesModel } = require("../model");
const Response = require("./Response");

class Services extends Response {
  addService = async (req, res) => {
    try {
      const { name, description, icon } = req.body;
      if (!description || !name) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Service name and description are required",
          status: 400,
        });
      }

      const existing = await ServicesModel.findOne({ name });
      if (existing) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Service already exists",
          status: 400,
        });
      }

      const newService = new ServicesModel({
        name,
        description,
        icon: icon || "code",
      });
      await newService.save();

      return this.sendResponse(req, res, {
        data: newService,
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
      const service = await ServicesModel.findOne({ _id: id }).select("-__v");
      if (!service) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No service found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: service,
        status: 200,
        message: "Service fetched",
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
      const service = await ServicesModel.find({}).select("-__v");
      if (!service) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No service found`,
        });
      }
      return this.sendResponse(req, res, {
        data: service,
        status: 200,
        message: "Services fetched",
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
          icon: req?.body?.icon || "code",
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
        message: "Service updated",
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
