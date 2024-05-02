const { TestimonialsModel } = require("../model");
const Response = require("./Response");

class Testimonials extends Response {
  addTestimonial = async (req, res) => {
    try {
      const { clientName, clientReview, stars, clientImage } = req.body;
      if (
        !clientName ||
        typeof clientName !== "string" ||
        !clientReview ||
        !stars ||
        !clientImage
      ) {
        return this.sendResponse(req, res, {
          data: null,
          message: "All fields are required",
          status: 400,
        });
      }

      // Save the testimonial to the database
      const newTesttestimonial = new TestimonialsModel({
        clientImage,
        clientName,
        clientReview,
        stars,
      });
      await newTesttestimonial.save();

      return this.sendResponse(req, res, {
        data: null,
        message: "Testimonial added successfully",
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
  getTestimonial = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return this.sendResponse(req, res, {
          status: 400,
          message: "Id is required to retrieve the testimonial",
        });
      }
      // Find the testimonial by its id from
      const testimonial = await TestimonialsModel.findOne({ _id: id }).select(
        "-__v"
      );
      if (!testimonial) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No testimonial found with the given Id ${id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: testimonial,
        status: 200,
        message: "Testtestimonial fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  getTestimonials = async (req, res) => {
    try {
      const testimonial = await TestimonialsModel.find({}).select("-__v");
      if (!testimonial) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No testimonial found`,
        });
      }
      return this.sendResponse(req, res, {
        data: testimonial,
        status: 200,
        message: "Testtestimonial fetched",
      });
    } catch (error) {
      console.log(error);
      return this.sendResponse(req, res, {
        status: 500,
        message: "Internal Server Error!",
      });
    }
  };
  updateTestimonial = async (req, res) => {
    try {
      const testimonial = await TestimonialsModel.findByIdAndUpdate(
        req?.params?.id,
        {
          clientName: req?.body?.clientName,
          clientImage: req?.body.clientImage,
          clientReview: req?.body?.clientReview,
          stars: req?.body?.stars,
        },
        { new: true }
      ).select("-__v");
      if (!testimonial) {
        return this.sendResponse(req, res, {
          status: 404,
          message: `No testimonial found with the given ${req?.params?.id}`,
        });
      }
      return this.sendResponse(req, res, {
        data: testimonial,
        status: 200,
        message: "Testtestimonial updated",
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
module.exports = { Testimonials };
