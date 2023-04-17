const router =require("express").Router();
const { setResponse } = require("./utils");

const projects =[
    {
        id: 1,
        p_name:"mern stack",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
        link:"https//:linkhere.com"
    },
    {
        id: 2,
        p_name:"Web development",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
        link:"https//:linkhere.com"
    },
    {
        id: 3,
        p_name:"App development",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
        link:"https//:linkhere.com"
    },
    {
        id: 4,
        p_name:"Ui/Ux Designer",
        description:"Lorem ipsum dolosr sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
        link:"https//:linkhere.com"
    },
    {
        id: 5,
        p_name:"App development",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
        link:"https//:linkhere.com",
    },
];

router.get("/", (req, res) => {
    return setResponse(res, null, projects, 200);
  });
  
  module.exports = router;
  