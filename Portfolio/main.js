// Skills Data

const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "C++",
    "Python",
    "Git"
];


// Projects Data

const projects = [
    {
        name: "Code Track",
        description:
        "Competitive Programming Tracker built with MERN Stack.",
        link:
        "https://code-track-nine.vercel.app/"
    },

    {
        name: "Local Skill Freelance",
        description:
        "A platform connecting freelancers with clients.",
        link:
        "https://local-skill.onrender.com/"
    }
];


// Contact Data

const contacts = [
    {
        name:"GitHub",
        link:"https://github.com/ibo-123"
    },

    {
        name:"LinkedIn",
        link:"https://www.linkedin.com/in/ibrahim-kedir-601420354/"
    },

    {
        name:"Codeforces",
        link:"https://codeforces.com/profile/ibrahimkediramdela2211"
    },

    {
        name:"LeetCode",
        link:"https://leetcode.com/u/ibro_man"
    }
];


// Generate Skills

const skillBox = document.getElementById("skillBox");

skills.forEach(skill => {

    skillBox.innerHTML += `
        <div class="card">
            <h3>${skill}</h3>
        </div>
    `;

});


// Generate Projects

const projectBox = document.getElementById("projectBox");

projects.forEach(project => {

    projectBox.innerHTML += `

    <div class="card">

        <h3>${project.name}</h3>

        <p>
            ${project.description}
        </p>

        <a href="${project.link}" target="_blank">
            Live Demo
        </a>

    </div>

    `;

});


// Generate Contacts

const contactBox = document.getElementById("contactBox");

contacts.forEach(contact => {

    contactBox.innerHTML += `

    <div class="card">

        <h3>${contact.name}</h3>

        <a href="${contact.link}" target="_blank">
            Visit
        </a>

    </div>

    `;

});


// Typing Effect

const title = "MERN Stack Programmer";

let index = 0;

function typing(){

    if(index < title.length){

        document.querySelector(".hero h2")
        .textContent += title[index];

        index++;

        setTimeout(typing,100);
    }

}


// Start Animation

document.addEventListener(
"DOMContentLoaded",
typing
);