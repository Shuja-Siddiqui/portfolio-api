const { VideoModel, DeveloperModel, ProjectModel } = require("../model");
const Response = require("./Response");

class Video extends Response {
  addVideo = async (req, res) => {
    try {
      const { title, link, developerID, projectID } = req.body;

      if (!title || !link) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Title and link are required",
          status: 400,
        });
      }

      // Validate developerID if provided
      if (developerID) {
        const developer = await DeveloperModel.findById(developerID);
        if (!developer) {
          return this.sendResponse(req, res, {
            data: null,
            message: "Invalid developer ID",
            status: 400,
          });
        }
      }

      // Validate projectID if provided
      if (projectID) {
        const project = await ProjectModel.findById(projectID);
        if (!project) {
          return this.sendResponse(req, res, {
            data: null,
            message: "Invalid project ID",
            status: 400,
          });
        }
      }

      const newVideo = new VideoModel({
        title,
        link,
        developerID: developerID || null,
        projectID: projectID || null,
      });

      await newVideo.save();

      return this.sendResponse(req, res, {
        data: newVideo,
        message: "Video added successfully",
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

  getVideo = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the video",
        });
      }

      const video = await VideoModel.findById(id)
        .populate("developerID", "name devId")
        .populate("projectID", "projectName clientName")
        .select("-__v");

      if (!video) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No video found with the given Id ${id}`,
        });
      }

      return this.sendResponse(req, res, {
        data: video,
        status: 200,
        message: "Video fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };

  getVideos = async (req, res) => {
    try {
      const videos = await VideoModel.find()
        .populate("developerID", "name devId")
        .populate("projectID", "projectName clientName")
        .select("-__v")
        .sort({ createdAt: -1 });

      return this.sendResponse(req, res, {
        data: videos,
        status: 200,
        message: "Videos fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };

  // Get videos by developerID or projectID (for extension)
  getVideosByDeveloperOrProject = async (req, res) => {
    try {
      const { developerID, projectID } = req.query;
      
      // Build query with $or to match either developerID or any of the projectIDs
      const conditions = [];
      
      if (developerID) {
        conditions.push({ developerID: developerID });
      }
      
      // Handle multiple projectIDs (query params can be array or single value)
      if (projectID) {
        const projectIDs = Array.isArray(projectID) ? projectID : [projectID];
        // Filter out empty values
        const validProjectIDs = projectIDs.filter(id => id && id.trim() !== '');
        if (validProjectIDs.length > 0) {
          conditions.push({ projectID: { $in: validProjectIDs } });
        }
      }
      
      // If we have conditions, use $or, otherwise return empty
      let query = {};
      if (conditions.length > 0) {
        query = conditions.length > 1 ? { $or: conditions } : conditions[0];
      } else {
        return this.sendResponse(req, res, {
          data: [],
          status: 200,
          message: "Videos fetched",
        });
      }

      const videos = await VideoModel.find(query)
        .populate("developerID", "name devId")
        .populate("projectID", "projectName clientName")
        .select("-__v")
        .sort({ createdAt: -1 });

      return this.sendResponse(req, res, {
        data: videos,
        status: 200,
        message: "Videos fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };

  updateVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, link, developerID, projectID } = req.body;

      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to update the video",
        });
      }

      if (!title || !link) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Title and link are required",
        });
      }

      // Validate developerID if provided
      if (developerID) {
        const developer = await DeveloperModel.findById(developerID);
        if (!developer) {
          return this.sendResponse(req, res, {
            data: null,
            message: "Invalid developer ID",
            status: 400,
          });
        }
      }

      // Validate projectID if provided
      if (projectID) {
        const project = await ProjectModel.findById(projectID);
        if (!project) {
          return this.sendResponse(req, res, {
            data: null,
            message: "Invalid project ID",
            status: 400,
          });
        }
      }

      const updatedVideo = await VideoModel.findByIdAndUpdate(
        id,
        {
          title,
          link,
          developerID: developerID || null,
          projectID: projectID || null,
          updatedAt: new Date(),
        },
        { new: true }
      )
        .populate("developerID", "name devId")
        .populate("projectID", "projectName clientName")
        .select("-__v");

      if (!updatedVideo) {
        return this.sendResponse(req, res, {
          status: 404,
          message: "No video found with the given Id",
        });
      }

      return this.sendResponse(req, res, {
        data: updatedVideo,
        status: 200,
        message: "Video updated successfully",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };

  deleteVideo = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to delete the video",
        });
      }

      const deletedVideo = await VideoModel.findByIdAndDelete(id).select(
        "-__v"
      );

      if (!deletedVideo) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No video found with the given Id ${id}`,
        });
      }

      return this.sendResponse(req, res, {
        data: deletedVideo,
        status: 200,
        message: "Video deleted successfully",
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

module.exports = { Video };
