const { ProjectModel } = require("../model");
const Response = require("./Response");

class Projects extends Response {
  addProject = async (req, res) => {
    try {
      const { projectName, clientName, duration, description, technologies } =
        req.body;
      if (
        !projectName ||
        !clientName ||
        !duration ||
        !description ||
        !technologies
      ) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All fields are required",
          status: 400,
        });
      }
      // Normalize the project name (convert to lowercase and remove underscores)
      const normalizedProjectName = projectName
        .toLowerCase()
        .replace(/_/g, "")
        .replace(/\s+/g, "");
      const projectExist = await ProjectModel.findOne({
        projectName: normalizedProjectName,
      });
      if (projectExist) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Project already exists",
          status: 400,
        });
      }

      // Save the project to the database
      const newProject = new ProjectModel({
        projectName: normalizedProjectName,
        clientName,
        duration,
        description,
        technologies,
      });
      await newProject.save();

      return this.sendResponse(req, res, {
        data: null,
        message: "Project added successfully",
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
  getProject = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the project",
        });
      }
      // Find the project by its id from
      const project = await ProjectModel.findOne({ _id: id }).select("-__v");
      if (!project) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No project found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: project,
        status: 200,
        message: "Project fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getProjects = async (req, res) => {
    try {
      const project = await ProjectModel.find().select("-__v");
      if (!project) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No project found with `,
        });
      }
      return this.sendResponse(req, res, {
        data: project,
        status: 200,
        message: "Project fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateProject = async (req, res) => {
    try {
      const id = req.params.id;
      const { projectName, clientName, duration, description, technologies } =
        req?.body;
      let project = await ProjectModel.findByIdAndUpdate(
        id,
        {
          clientName,
          projectName,
          description,
          duration,
          technologies: technologies
            ? technologies.map(({ name, level }) => ({
                name: name,
                level,
              }))
            : [],
        },
        { new: true }
      ).exec();

      if (!project) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "No Project found under the given devId !",
        });
      }
      return this.sendResponse(req, res, {
        status: 200,
        message: "Project is updated !",
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
module.exports = { Projects };
