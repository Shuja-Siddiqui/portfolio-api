const { EducationsModel, DeveloperModel } = require("../model");
const Response = require("./Response");

class Educations extends Response {
  addEducation = async (req, res) => {
    try {
      const { institution, description, major, timeSpan, devId } = req.body;
      if (!institution || !description || !major || !timeSpan || !devId) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      // Save the education to the database
      const newEducation = new EducationsModel({
        institution,
        description,
        major,
        timeSpan,
        devId,
      });
      await newEducation.save();
      // Find the developer
      const developer = await DeveloperModel.findById(devId);
      if (!developer) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Developer not found",
          status: 404,
        });
      }

      // Update the developer's education array
      developer.education.push(newEducation._id);
      await developer.save();

      return this.sendResponse(req, res, {
        data: null,
        message: "Education added successfully",
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
  getEducation = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the education",
        });
      }
      // Find the education by its id from
      const education = await EducationsModel.findOne({ _id: id }).select(
        "-__v"
      );
      if (!education) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No education found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: education,
        status: 200,
        message: "Education fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getEducations = async (req, res) => {
    try {
      const education = await EducationsModel.find({}).select("-__v");
      if (!education) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No education found`,
        });
      }
      return this.sendResponse(req, res, {
        data: education,
        status: 200,
        message: "Education fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateEducation = async (req, res) => {
    try {
      const education = await EducationsModel.findByIdAndUpdate(
        req?.params?.id,
        {
          institution: req?.body?.institution,
          timeSpan: req?.body.timeSpan,
          major: req?.body?.major,
          description: req?.body?.description,
          devId: req?.body?.devId,
        },
        { new: true }
      ).select("-__v");
      if (!education) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No education found with the given ${req?.params?.id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: education,
        status: 200,
        message: "Education updated",
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
module.exports = { Educations };
