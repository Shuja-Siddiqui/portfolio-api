const mongoose = require("mangoose");
const Schema = mongoose.Schema;
const oid = mongoose.Types.ObjectId;


const userSchema = Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const developerSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    field:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    about:{
        type: String,
        required: true,
    },
    user_id:{
        type: oid,
        required: true,
    }
});

const serviceSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    user_id:{
        type: oid,
        required: true,
    }
});

const projectSchema = Schema({
    project_name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
    user_id:{
        type: oid,
        required: true,
    }
});

const testimonialSchema = Schema({
    client_name:{
        type: String,
        required: true,
    },
    review:{
        type: String,
        required: true,
    },
    stars:{
        type: String,
        required: true,
    },
    field:{
        type: String,
        required: true,
    },
    user_id:{
        type: oid,
        required: true,
    }
});



const DeveloperInfo = mongoose.model("DeveloperInfo", developerSchema);
const Service = mongoose.model("Service", serviceSchema);
const Project = mongoose.model("Project", projectSchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = {
    DeveloperInfo,
    Service,
    Project,
    Testimonial,
};