const router = require("express").Router();
const { setResponse } = require("./utils");

const arr =[
    {
        id: 1,
        name:"ali",
        field:"mern stack",
        stars:"4",
        review:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 2,
        name:"Haris",
        field:"Web development",
        stars:"3",
        review:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 3,
        name:"AbdulRaheem",
        field:"App development",
        stars:"4",
        review:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 4,
        name:"AbuZar",
        field:"Ui/Ux Designer",
        stars:"3",
        review:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    },
    {
        id: 5,
        name:"Fahad Ur Rehman",
        field:"App development",
        stars:"2",
        review:"Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?",
    }
]

router.get("/" ,(req, res) => {
    return setResponse(res,null,arr,200);
});

module.exports = router;