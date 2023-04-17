const router = require("express").Router();
const { setResponse } = require("./utils");

const arr =[
    {
        id: 1,
        field:"mern stack",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 2,
        field:"Web development",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 3,
        field:"App development",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 4,
        field:"Ui/Ux Designer",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 5,
        field:"App development",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    }
];

router.get("/", (req, res) =>{
    return setResponse(res,null,arr,200)
});

module.exports = router;