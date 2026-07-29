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
    name:"Code Track",
    image:"images/code-track.png",
    description:"Competitive Programming Tracker built using the MERN Stack.",
    live:"https://code-track-nine.vercel.app/",
    github:"https://github.com/ibo-123/Code-Track"
},

{
    name:"Local Skill Freelance",
    image:"images/local-skill.png",
    description:"A MERN platform connecting freelancers with clients.",
    live:"https://local-skill.onrender.com/",
    github:"#"
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

projectBox.innerHTML += `
<div class="card">

    <img src="${project.image}" alt="${project.name}">

    <h3>${project.name}</h3>

    <p>${project.description}</p>

    <a href="${project.live}" target="_blank">
        Live Demo
    </a>

    <a href="${project.github}" target="_blank">
        GitHub
    </a>

</div>
`;


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