const { DeveloperModel } = require("../model");
const Response = require("./Response");
const mongoose = require("mongoose");

class Developer extends Response {
  addDeveloper = async (req, res) => {
    try {
      const {
        name,
        devId,
        avatar,
        residence,
        age,
        skills,
        projects,
        links,
        about,
      } = req.body;
      if (
        !name ||
        !devId ||
        !avatar ||
        !residence ||
        !age ||
        !skills ||
        !projects ||
        !links ||
        !about
      ) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All fields are required",
          status: 400,
        });
      }
      const devExist = await DeveloperModel.findOne({ devId: devId });

      if (devExist) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Developer already exists",
          status: 400,
        });
      }
      // Save the developer to the database
      const newDeveloper = new DeveloperModel({
        name,
        devId,
        avatar,
        residence,
        age,
        skills,
        projects: projects
          ? projects?.map((project) => project?.id)?.filter((id) => id)
          : [],
        links,
        about,
      });
      await newDeveloper.save();
      return this.sendResponse(req, res, {
        data: null,
        message: "Developer added successfully",
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
  getDeveloper = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the developer",
        });
      }

      // Find the developer by its id and populate the projects field
      const developer = await DeveloperModel.findOne({ _id: id })
        .populate({
          path: "projects",
          populate: {
            path: "technologies",
            select: "name level",
            populate: {
              path: "name",
            },
          },
        })
        .populate({
          path: "skills",
          populate: {
            path: "title",
          },
        })
        .select("-__v");
      if (!developer) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No developer found with the given Id ${id}`,
        });
      }

      return this.sendResponse(req, res, {
        data: developer,
        status: 200,
        message: "Developer fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getDevelopers = async (req, res) => {
    try {
      const developer = await DeveloperModel.find({})
        .populate({
          path: "projects",
          populate: {
            path: "technologies",
            select: "name level",
            populate: {
              path: "name",
            },
          },
        })
        .populate({
          path: "skills",
          populate: {
            path: "title",
          },
        })
        .populate({
          path: "avatar",
        })
        .select("-__v");

      if (!developer) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No developer found `,
        });
      }

      return this.sendResponse(req, res, {
        data: developer,
        status: 200,
        message: "Developers fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateDeveloper = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,
        devId,
        avatar,
        residence,
        age,
        skills,
        projects,
        links,
        about,
      } = req?.body;
      let developer = await DeveloperModel.findByIdAndUpdate(
        id,
        {
          avatar,
          devId,
          name,
          age,
          residence,
          skills: skills
            ? skills.map(({ title, ratings }) => ({
                title: title,
                ratings,
              }))
            : [],
          projects: projects
            ? projects?.map((project) => project?.id)?.filter((id) => id)
            : [],
          links: links
            ? links?.map((link) => ({
                title: link.title,
                url: link.url,
              }))
            : {},
          about,
        },
        { new: true }
      ).exec();

      if (!developer) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "No developer found under the given devId !",
        });
      }
      return this.sendResponse(req, res, {
        status: 200,
        message: "Developer is updated !",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal server error !",
      });
    }
  };
}
module.exports = { Developer };