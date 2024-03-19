const { ExperiencesModel, DeveloperModel } = require("../model");
const Response = require("./Response");

class Experience extends Response {
  addExperience = async (req, res) => {
    try {
      const { company, description, role, timeSpan, devId } = req.body;
      if (!company || !description || !role || !timeSpan || !devId) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All Fields are required",
          status: 400,
        });
      }

      // Save the experience to the database
      const newExperience = new ExperiencesModel({
        company,
        description,
        role,
        timeSpan,
        devId,
      });
      await newExperience.save();
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
      developer.experience.push(newExperience._id);
      await developer.save();

      return this.sendResponse(req, res, {
        data: null,
        message: "Experience added successfully",
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
  getExperience = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the experience",
        });
      }
      // Find the experience by its id from
      const experience = await ExperiencesModel.findOne({ _id: id }).select(
        "-__v"
      );
      if (!experience) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No experience found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: experience,
        status: 200,
        message: "Testexperience fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getExperiences = async (req, res) => {
    try {
      const experience = await ExperiencesModel.find({}).select("-__v");
      if (!experience) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No experience found`,
        });
      }
      return this.sendResponse(req, res, {
        data: experience,
        status: 200,
        message: "experience fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateExperience = async (req, res) => {
    try {
      const experience = await ExperiencesModel.findByIdAndUpdate(
        req?.params?.id,
        {
          clientName: req?.body?.clientName,
          clientImage: req?.body.clientImage,
          review: req?.body?.review,
          stars: req?.body?.stars,
        },
        { new: true }
      ).select("-__v");
      if (!experience) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No experience found with the given ${req?.params?.id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: experience,
        status: 200,
        message: "Experience updated",
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
module.exports = { Experience };
