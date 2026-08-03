import express from "express";

import {
    getProfile,
    createProfile,
    updateProfile,

    getSkill,
    addSkill,
    updateSkill,
    deleteSkill,

    getProject,
    addProject,
    updateProject,
    deleteProject

} from "../controller/main.controller.js";


const router = express.Router();


// ================= PROFILE =================

router.get(
    "/profile",
    getProfile
);

router.post(
    "/profile",
    createProfile
);

router.put(
    "/profile",
    updateProfile
);


// ================= SKILLS =================

router.get(
    "/skills",
    getSkill
);

router.post(
    "/skills",
    addSkill
);

router.put(
    "/skills/:id",
    updateSkill
);

router.delete(
    "/skills/:id",
    deleteSkill
);


// ================= PROJECTS =================

router.get(
    "/projects",
    getProject
);

router.post(
    "/projects",
    addProject
);

router.put(
    "/projects/:id",
    updateProject
);

router.delete(
    "/projects/:id",
    deleteProject
);


export default router;