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
  return setResponse(res, null, data[parseInt(req.params.id)], 200);
});

app.get("/dev_information/:uid", (req, res) => {
  return setResponse(
    res,
    null,
    data[parseInt(req.params.uid)].dev_information,
    200
  );
});

app.get("/services/:uid", (req, res) => {
  return setResponse(res, null, data[parseInt(req.params.uid)].services, 200);
});

app.get("/services/:uid/:id", (req, res) => {
  return setResponse(
    res,
    null,
    data[parseInt(req.params.uid)].services[parseInt(req.params.id)],
    200
  );
});

app.get("/projects/:uid", (req, res) => {
  return setResponse(res, null, data[parseInt(req.params.uid)].projects, 200);
});

app.get("/projects/:uid/:id", (req, res) => {
  return setResponse(
    res,
    null,
    data[parseInt(req.params.uid)].projects[parseInt(req.params.id)],
    200
  );
});

app.get("/testimonials/:uid", (req, res) => {
  return setResponse(
    res,
    null,
    data[parseInt(req.params.uid)].testimonials,
    200
  );
});

app.get("/testimonials/:uid/:id", (req, res) => {
  return setResponse(
    res,
    null,
    data[parseInt(req.params.uid)].testimonials[parseInt(req.params.id)],
    200
  );
});

// -------post request--

app.post("/login/", (req, res) => {
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
});

app.post("/services/:uid", (req, res) => {
  const { name, description } = req.body;
  data[parseInt(req.params.uid)].services.push({
    _id: data[parseInt(req.params.uid)].services.length + 1,
    name,
    description,
  });
  return setResponse(res, "new", null, 201);
});

app.post("/projects/:uid", (req, res) => {
  const { project_name, description, link } = req.body;
  data[parseInt(req.params.uid)].projects.push({
    _id: data[parseInt(req.params.uid)].projects.length + 1,
    project_name,
    description,
    link,
  });
  return setResponse(res, "new", null, 201);
});

app.post("/testimonial/:uid", (req, res) => {
  const { client_name, review, stars, field } = req.body;
  data[parseInt(req.params.uid)].testimonial.push({
    _id: data[parseInt(req.params.uid)].testimonial.length + 1,
    client_name,
    review,
    stars,
    field,
  });
  return setResponse(res, "new", null, 201);
});

// app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server Started: http://localhost:${PORT}`);
});










// router.put("/:id", (req, res) => {
//   const { name, field, email, phone, about } = req.body;
//   arr.map((item, index) => {
//     if (item.id == req.params.id) {
//       arr[index] = { id: req.params.id, name, field, email, phone, about };
//     }
//   });
//   return setResponse(res, "Data updated", null, 200);
// });

// router.delete("/:id", (req, res) => {
//   arr = arr.filter((i) => i.id != req.params.id);
//   return setResponse(res, "data deleted", null, 200);
// });