import Profile from "../model/Profile.js";
import Project from "../model/Project.js";
import Skill from "../model/Skill.js";

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getProject = async (req, res) => {

    try {

        const projects = await Project.find();

        return res.status(200).json({

            success: true,

            data: projects

        });


    } catch(err){

        return res.status(500).json({

            success:false,
            message:err.message

        });

    }

};

const getSkill = async (req,res)=>{

    try{

        const skills = await Skill.find();


        return res.status(200).json({

            success:true,

            data:skills

        });


    }catch(err){

        return res.status(500).json({

            success:false,

            message:err.message

        });

    }

};
const addSkill = async (req,res)=>{

    try{

        const {name, icon, level, category} = req.body;


        if(!name){
            return res.status(400).json({
                success:false,
                message:"Skill name is required"
            });
        }


        const existingSkill = await Skill.findOne({
            name
        });


        if(existingSkill){
            return res.status(400).json({
                success:false,
                message:"Skill already exists"
            });
        }


        const skill = await Skill.create({
            name,
            icon: icon || null,
            level,
            category
        });


        res.status(201).json({
            success:true,
            data:skill
        });


    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

};
const addProject = async(req,res)=>{

try{


const {
name,
description,
image,
technologies,
live,
github,
featured

}=req.body;



if(!name || !description || !image || !live || !github){

return res.status(400).json({

success:false,

message:"Required fields missing"

});

}



const existingProject =
await Project.findOne({name});


if(existingProject){

return res.status(400).json({

success:false,

message:"Project already exists"

});

}



const project = await Project.create({

name,

description,

image,

technologies: technologies || [],

live,

github,

featured: featured || false

});



return res.status(201).json({

success:true,

data:project

});



}catch(err){


return res.status(500).json({

success:false,

message:err.message

});


}

};
const updateSkill = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, icon, level , category } = req.body;

        if (!name && !icon && !level) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update."
            });
        }

        // Prevent duplicate names
        if (name) {
            const existingSkill = await Skill.findOne({ name });

            if (existingSkill && existingSkill._id.toString() !== id) {
                return res.status(400).json({
                    success: false,
                    message: "Skill already exists."
                });
            }
        }

        const skill = await Skill.findByIdAndUpdate(
id,
{
...(name !== undefined && {name}),
...(icon !== undefined && {icon}),
...(level !== undefined && {level}),
...(category !== undefined && {category})
},
{
new:true,
runValidators:true
}
);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: skill
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
const deleteSkill = async (req, res) => {
    try {

        const { id } = req.params;

        const skill = await Skill.findByIdAndDelete(id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Skill deleted successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
const updateProject = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            name,
            description,
            image,
            technologies,
            live,
            github,
            featured
        } = req.body;

        if (
            !name &&
            !description &&
            !image &&
            !technologies &&
            !live &&
            !github &&
            featured === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update."
            });
        }

        if (name) {
            const existingProject = await Project.findOne({ name });

            if (
                existingProject &&
                existingProject._id.toString() !== id
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Project already exists."
                });
            }
        }

        const project = await Project.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(description && { description }),
                ...(image && { image }),
                ...(technologies && { technologies }),
                ...(live && { live }),
                ...(github && { github }),
                ...(featured !== undefined && { featured })
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: project
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
const deleteProject = async (req, res) => {
    try {

        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
const createProfile = async (req, res) => {
    try {
        const existing = await Profile.findOne();

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists"
            });
        }

        const profile = await Profile.create(req.body);

        res.status(201).json({
            success: true,
            data: profile
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const updateProfile = async (req, res) => {
    try {
        const {
            name,
            title,
            bio,
            profileImage,
            problemsSolved,
            university,
            email,
            socialLinks
        } = req.body;

        // Find the only profile
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        // Update only provided fields
        if (name !== undefined) profile.name = name;
        if (title !== undefined) profile.title = title;
        if (bio !== undefined) profile.bio = bio;
        if (profileImage !== undefined) profile.profileImage = profileImage;
        if (problemsSolved !== undefined) profile.problemsSolved = problemsSolved;
        if (university !== undefined) profile.university = university;
        if (email !== undefined) profile.email = email;

        if (socialLinks) {
            profile.socialLinks = {
                ...profile.socialLinks,
                ...socialLinks
            };
        }

        await profile.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profile
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
export {
    getProfile,
    getProject,
    getSkill,
    addSkill,
    addProject,
    updateSkill,
    deleteSkill,
    updateProject,
    deleteProject,
    createProfile,
    updateProfile
};