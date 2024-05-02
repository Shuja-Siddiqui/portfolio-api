const { SkillsModel } = require("../model");
const Response = require("./Response");

class Skills extends Response {
  addSkill = async (req, res) => {
    try {
      const { skillName } = req.body;
      if (!skillName || typeof skillName !== "string") {
        return this.sendResponse(req, res, {
          data: null,
          message: "Skill is Required of Type String",
          status: 400,
        });
      }

      // Normalize the skill name (convert to lowercase and remove underscores)
      const normalizedSkillName = skillName
        .toLowerCase()
        .replace(/_/g, "")
        .replace(/\s+/g, "");

      // Check if a skill with the normalized name already exists in the database
      let skillExist = await SkillsModel.findOne({
        skillName: normalizedSkillName,
      });
      if (skillExist) {
        return this.sendResponse(req, res, {
          data: null,
          message: "Skill already exists",
          status: 400,
        });
      }

      // Save the skill to the database
      const newSkill = new SkillsModel({ skillName: normalizedSkillName });
      await newSkill.save();

      return this.sendResponse(req, res, {
        data: null,
        message: "Skill added successfully",
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
  getSkill = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the skill",
        });
      }
      // Find the skill by its id from
      const skill = await SkillsModel.findOne({ _id: id }).select("-__v");
      if (!skill) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No skill found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: skill,
        status: 200,
        message: "Skill fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getSkills = async (req, res) => {
    try {
      const skill = await SkillsModel.find({}).select("-__v");
      if (!skill) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No skill found`,
        });
      }
      return this.sendResponse(req, res, {
        data: skill,
        status: 200,
        message: "Skill fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateSkill = async (req, res) => {
    try {
      const skill = await SkillsModel.findByIdAndUpdate(
        req?.params?.id,
        {
          skillName: req?.body?.skillName ? req?.body?.skillName : {},
        },
        { new: true }
      ).select("-__v");
      if (!skill) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No skill found with the given ${req?.params?.id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: skill,
        status: 200,
        message: "Skill updated",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  removeSkill = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to remove the skill",
        });
      }
      // Find the skill by its id and remove it
      const deletedSkill = await SkillsModel.findOneAndDelete({
        _id: id,
      }).select("-__v");
      if (!deletedSkill) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No skill found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: deletedSkill,
        status: 200,
        message: "Skill deleted successfully",
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
module.exports = { Skills };
