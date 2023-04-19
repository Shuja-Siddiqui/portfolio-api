const express = require("express");
const app = express();
const cors = require("cors");
// const routes = require("./routes");
const { setResponse } = require("./utils");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

let data = [
  {
    _id: 1,
    user_info: {
      username: "admin",
      password: "12344321",
    },
    dev_information: {
      name: "hassaan",
      field: "mern",
      email: "abdulraheem@gmail.com",
      phone: "+923345678",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur modi commodi dolor suscipit recusandae alias magni exercitationem, rerum hic molestiae atque dolore reiciendis aliquam quae accusamus vitae? Eos, velit! Reprehenderit.",
    },
    services: [
      {
        _id: 1,
        name: "asd",
        description: "lorem ipsum",
      },
      {
        _id: 2,
        name: "asfvtrgtr5ghd",
        description: "lorem ipsg6hgt65ht6yhyum",
      },
    ],
    projects: [
      {
        _id: 1,
        project_name: "asd",
        description: "lorem ipsum",
        link: "https://asd.com",
      },
    ],
    testimonial: [
      {
        _id: 1,
        client_name: "asd",
        review: "lorem ipsum",
        stars: 4,
        field: "asd",
      },
    ],
  },
  {
    _id: 2,
    user_info: {
      username: "admin",
      password: "123443",
    },
    dev_information: {
      name: "shuja",
      field: "mern",
      email: "abdulraheem@gmail.com",
      phone: "+923345678",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur modi commodi dolor suscipit recusandae alias magni exercitationem, rerum hic molestiae atque dolore reiciendis aliquam quae accusamus vitae? Eos, velit! Reprehenderit.",
    },
    services: [
      {
        _id: 1,
        name: "jhgvdyur",
        description: "lorem ipsum",
      },
      {
        _id: 2,
        name: "jhgvdgbuymumuymnyjyyur",
        description: "lorem k7il9l;;0ipsum",
      },
    ],
    projects: [
      {
        _id: 1,
        project_name: "ndbhu",
        description: "lorem ipsum",
        link: "https://asd.com",
      },
    ],
    testimonial: [
      {
        _id: 1,
        client_name: "asdfvd",
        review: "lorem ipsum",
        stars: 4,
        field: "asd",
      },
    ],
  },
];

app.use(cors());
app.use(express.json());

// ----------rest api---------

// -----get request-----
app.get("/:id", (req, res) => {
  try {
    return setResponse(res, null, data[parseInt(req.params.id)], 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.get("/dev_information/:uid", (req, res) => {
  try {
    return setResponse(
      res,
      null,
      data[parseInt(req.params.uid)].dev_information,
      200
    );
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.get("/services/:uid", (req, res) => {
  try {
    return setResponse(res, null, data[parseInt(req.params.uid)].services, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.get("/services/:uid/:id", (req, res) => {
  try {
    return setResponse(
      res,
      null,
      data[parseInt(req.params.uid)].services[parseInt(req.params.id)],
      200
    );
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.get("/projects/:uid", (req, res) => {
  try {
    return setResponse(res, null, data[parseInt(req.params.uid)].projects, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.get("/projects/:uid/:id", (req, res) => {
  try {
    return setResponse(
      res,
      null,
      data[parseInt(req.params.uid)].projects[parseInt(req.params.id)],
      200
    );
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.get("/testimonials/:uid", (req, res) => {
  try {
    return setResponse(
      res,
      null,
      data[parseInt(req.params.uid)].testimonials,
      200
    );
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.get("/testimonials/:uid/:id", (req, res) => {
  try {
    return setResponse(
      res,
      null,
      data[parseInt(req.params.uid)].testimonials[parseInt(req.params.id)],
      200
    );
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

// -------post request--

app.post("/login/", (req, res) => {
  try {
    const { username, password } = req.body;
    let userFound = false;
    let userIndex = -1;
    data.map((item, index) => {
      if (
        item.user_info.username === username &&
        item.user_info.password == password
      ) {
        userFound = true;
        userIndex = index;
      }
    });
    if (!userFound) {
      return setResponse(res, "username/password incorrect", null, 404);
    }

    return setResponse(res, "Login Successfull", data[userIndex], 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.post("/services/:uid", (req, res) => {
  try {
    const { name, description } = req.body;
    data[parseInt(req.params.uid)].services.push({
      _id: data[parseInt(req.params.uid)].services.length + 1,
      name,
      description,
    });
    return setResponse(res, "new", null, 201);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.post("/projects/:uid", (req, res) => {
  try {
    const { project_name, description, link } = req.body;
    data[parseInt(req.params.uid)].projects.push({
      _id: data[parseInt(req.params.uid)].projects.length + 1,
      project_name,
      description,
      link,
    });
    return setResponse(res, "new", null, 201);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.post("/testimonial/:uid", (req, res) => {
  try {
    const { client_name, review, stars, field } = req.body;
    data[parseInt(req.params.uid)].testimonial.push({
      _id: data[parseInt(req.params.uid)].testimonial.length + 1,
      client_name,
      review,
      stars,
      field,
    });
    return setResponse(res, "new", null, 201);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

// ----------------put api-------------

app.put("/dev_information/:uid", (req, res) => {
  try {
    const { name, field, email, phone, about } = req.body;
    if (!name || !field || !email || !phone || !about) {
      return setResponse(res, "All fields are required", null, 405);
    }
    const { _id } =
      data[parseInt(req.params.uid)].dev_information[parseInt(req.params.id)];
    data[parseInt(req.params.uid)].dev_information = {
      _id,
      name,
      field,
      email,
      phone,
      about,
    };
    return setResponse(res, "Data updated", null, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.put("/services/:uid/:id", (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return setResponse(res, "All fields are required", null, 405);
    }
    const { _id } =
      data[parseInt(req.params.uid)].services[parseInt(req.params.id)];
    data[parseInt(req.params.uid)].services[parseInt(req.params.id)] = {
      _id,
      name,
      description,
    };
    return setResponse(res, "Data updated", null, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.put("/projects/:uid/:id", (req, res) => {
  try {
    const { project_name, description, link } = req.body;
    if (!project_name || !description || !link) {
      return setResponse(res, "All fields are required", null, 405);
    }
    data[parseInt(req.params.uid)].projects[parseInt(req.params.id)] = {
      project_name,
      description,
      link,
    };
    return setResponse(res, "Data updated", null, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.put("/testimonial/:uid/:id", (req, res) => {
  try {
    const { client_name, review, stars, field } = req.body;
    if (!client_name || !review || !stars || !field) {
      return setResponse(res, "All fields are required", null, 405);
    }
    const { _id } =
      data[parseInt(req.params.uid)].testimonial[parseInt(req.params.id)];
    data[parseInt(req.params.uid)].testimonial[parseInt(req.params.id)] = {
      _id,
      client_name,
      review,
      stars,
      field,
    };
    return setResponse(res, "Data updated", null, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

// -------delete api---------


app.delete("/services/:uid/:id", (req, res) => {
  try {
    data[parseInt(req.params.uid)].services = data[
      parseInt(req.params.uid)
    ].services.filter((item) => item._id != parseInt(req.params.id));
    return setResponse(res, "data deleted", null, 200);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.delete("/projects/:uid/:id", (req, res) => {
  try {
    data[parseInt(req.params.uid)].projects = data[
      parseInt(req.params.uid)
    ].projects.filter((items) => items._id != parseInt(req.params.id));
    return setResponse(res, "Data Deleted", null, 500);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

app.delete("/testimonial/:uid/:id", (req, res) => {
  try {
    data[parseInt(req.params.uid)].testimonial = data[
      parseInt(req.params.uid)
    ].testimonial.filter((items) => items._id != parseInt(req.params.id));
    return setResponse(res, "Data Deleted", null, 500);
  } catch {
    return setResponse(res, "Internal Server Error", null, 500);
  }
});

// app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server Started: http://localhost:${PORT}`);
});

// router.delete("/:id", (req, res) => {
//   arr = arr.filter((i) => i.id != req.params.id);
//   return setResponse(res, "data deleted", null, 200);
// });
