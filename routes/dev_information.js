const router = require("express").Router();
const { setResponse } = require("./utils");

let arr = [
  {
    id: 1,
    name: "Shuja Ur Rehman",
    field: "Mern Stack Developer",
    email: "shuja0094@gmail.com",
    phone: "+923314559519",
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur modi commodi dolor suscipit recusandae alias magni exercitationem, rerum hic molestiae atque dolore reiciendis aliquam quae accusamus vitae? Eos, velit! Reprehenderit.",
  },
  {
    id: 2,
    name: "haris",
    field: "web",
    email: "haris@gmail.com",
    phone: "+923345678909",
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur modi commodi dolor suscipit recusandae alias magni exercitationem, rerum hic molestiae atque dolore reiciendis aliquam quae accusamus vitae? Eos, velit! Reprehenderit.",
  },
  {
    id: 3,
    name: "abuzar",
    field: "app",
    email: "abuzar@gmail.com",
    phone: "+9233456778",
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur modi commodi dolor suscipit recusandae alias magni exercitationem, rerum hic molestiae atque dolore reiciendis aliquam quae accusamus vitae? Eos, velit! Reprehenderit.",
  },
  {
    id: 4,
    name: "abdulraheem",
    field: "ui/ux",
    email: "abdulraheem@gmail.com",
    phone: "+923345678",
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur modi commodi dolor suscipit recusandae alias magni exercitationem, rerum hic molestiae atque dolore reiciendis aliquam quae accusamus vitae? Eos, velit! Reprehenderit.",
  },
];

router.get("/", (req, res) => {
  return setResponse(res, null, arr, 200);
});

router.get("/:id", (req, res) => {
  return setResponse(res, null, arr[parseInt(req.params.id) - 1], 200);
});

router.post("/", (req, res) => {
  const { name, field, email, phone, about } = req.body;
  arr.push({ id: arr.length + 1, name, field, email, phone, about });
  setResponse(res, "New user created", null, 201);
});

router.put("/:id", (req, res) => {
  const { name, field, email, phone, about } = req.body;
  arr.map((item, index) => {
    if (item.id == req.params.id) {
      arr[index] = { id: req.params.id, name, field, email, phone, about };
    }
  });
  return setResponse(res, "Data updated", null, 200);
});

router.delete("/:id", (req, res) => {
  arr = arr.filter((i) => i.id != req.params.id);
  return setResponse(res, "data deleted", null, 200);
});

module.exports = router;
