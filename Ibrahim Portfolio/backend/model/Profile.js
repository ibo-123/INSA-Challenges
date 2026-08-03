import mongoose from "mongoose";

const profile = new mongoose.Schema({

        name : {
                type : String,
                required : true,
                trim : true
        },
        title: {
                type : String,
                required : true,
                trim : true
        },
        bio :{
                type : String,
                required : true,
                trim : true
        },
        profileImage : {
                type : String,
                required : true,
                trim : true,
                default : "ibo.png"
        },
        problemsSolved :{
                type : Number,
                required : true
                
        },
        university : {
                type : String,
                required : true,
                trim : true
        },
        email :{
                type : String,
                required : true,
                unique : true,
                trim : true,
                lowercase : true,
                match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },
        socialLinks:{

    github:{
        type:String,
        default:""
    },

    linkedin:{
        type:String,
        default:""
    },

    codeforces:{
        type:String,
        default:""
    },

    leetcode:{
        type:String,
        default:""
    }

}},
{
        timestamps: true,
    versionKey: false
}
       
);

const Profile = mongoose.model("Profile", profile);

export default Profile;


// {
//   "_id": "64f8a2...",
//   "name": "Ibrahim Kedir",
//   "title": "MERN Stack Programmer",
//   "bio": "Software Engineering student at ASTU passionate about Competitive Programming and Full Stack Development.",
//   "profileImage": "ibo.jpg",
//   "problemsSolved": "800+",
//   "university": "Adama Science and Technology University",
//   "email": "ibrahimkediramdela2211@gmail.com",

//   "socialLinks": {
//     "github": "https://github.com/ibo-123",
//     "linkedin": "https://linkedin.com/in/...",
//     "codeforces": "https://codeforces.com/profile/...",
//     "leetcode": "https://leetcode.com/u/ibro_man"
//   },

//   "createdAt": "2026-08-03",
//   "updatedAt": "2026-08-03"
// }