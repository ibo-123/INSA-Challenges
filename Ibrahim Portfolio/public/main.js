// =====================================
// API
// =====================================

const API = "https://ibrahim-portfolio-dk91.onrender.com/api";

const portfolio = {
    profile: {},
    skills: [],
    projects: [],
    contacts: []
};

// =====================================
// DOM
// =====================================

const heroName = document.querySelector(".hero h1");
const heroTitle = document.querySelector(".hero h2");
const heroBio = document.querySelector(".hero p");
const heroImage = document.querySelector(".hero img");

const about = document.querySelector("#about p");

const skillBox = document.getElementById("skillBox");
const projectBox = document.getElementById("projectBox");
const contactBox = document.getElementById("contactBox");

// =====================================
// LOAD PROFILE
// =====================================

async function loadProfile() {

    try {

        const res = await fetch(`${API}/profile`);
        const result = await res.json();
const aboutText = document.getElementById("aboutText");

if (aboutText) {
    aboutText.textContent = portfolio.profile.AboutMe || "";
}
        if (!result.success) return;

        portfolio.profile = result.data;

        heroName.textContent = portfolio.profile.name;
        heroBio.textContent = portfolio.profile.bio;
        heroImage.src = portfolio.profile.profileImage;

        about.innerHTML = `
            I have solved
            <b>${portfolio.profile.problemsSolved}+</b>
            programming problems and enjoy building modern web applications with the MERN Stack while continuously improving my problem-solving skills.
        `;

        portfolio.contacts = [

            {
                name: "GitHub",
                icon: "fa-brands fa-github",
                link: portfolio.profile.socialLinks.github
            },

            {
                name: "LinkedIn",
                icon: "fa-brands fa-linkedin",
                link: portfolio.profile.socialLinks.linkedin
            },

            {
                name: "Codeforces",
                icon: "fa-solid fa-code",
                link: portfolio.profile.socialLinks.codeforces
            },

            {
                name: "LeetCode",
                icon: "fa-solid fa-laptop-code",
                link: portfolio.profile.socialLinks.leetcode
            },

            {
                name: "Email",
                icon: "fa-solid fa-envelope",
                link: `mailto:${portfolio.profile.email}`
            }

        ];

        typingEffect();

    } catch (err) {

        console.log(err);

    }

}

// =====================================
// LOAD SKILLS
// =====================================

async function loadSkills() {

    try {

        const res = await fetch(`${API}/skills`);
        const result = await res.json();

        if (!result.success) return;

        portfolio.skills = result.data;

        renderSkills();

    } catch (err) {

        console.log(err);

    }

}

// =====================================
// LOAD PROJECTS
// =====================================

async function loadProjects() {

    try {

        const res = await fetch(`${API}/projects`);
        const result = await res.json();

        if (!result.success) return;

        portfolio.projects = result.data;

        renderProjects();

    } catch (err) {

        console.log(err);

    }

}

// =====================================
// RENDER SKILLS
// =====================================

function renderSkills() {

    skillBox.innerHTML = "";

    portfolio.skills.forEach(skill => {

        skillBox.innerHTML += `

        <div class="card">

            <i class="${skill.icon}"></i>

            <h3>${skill.name}</h3>

        </div>

        `;

    });

}

// =====================================
// RENDER PROJECTS
// =====================================

function renderProjects() {

    projectBox.innerHTML = "";

    portfolio.projects.forEach(project => {

        projectBox.innerHTML += `

        <div class="card">

            <img
                src="${project.image}"
                alt="${project.name}"
            >

            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <div>

                <a
                    href="${project.live}"
                    target="_blank">

                    Live Demo

                </a>

                <a
                    href="${project.github}"
                    target="_blank">

                    GitHub

                </a>

            </div>

        </div>

        `;

    });

}

// =====================================
// RENDER CONTACTS
// =====================================

function renderContacts() {

    contactBox.innerHTML = "";

    portfolio.contacts.forEach(contact => {

        contactBox.innerHTML += `

        <div class="card">

            <i class="${contact.icon}"></i>

            <h3>${contact.name}</h3>

            <a
                href="${contact.link}"
                target="_blank">

                Visit

            </a>

        </div>

        `;

    });

}

// =====================================
// TYPING EFFECT
// =====================================

function typingEffect() {

    heroTitle.textContent = "";

    const title = portfolio.profile.title || "";

    let index = 0;

    function typing() {

        if (index < title.length) {

            heroTitle.textContent += title[index];

            index++;

            setTimeout(typing, 80);

        }

    }

    typing();

}

// =====================================
// INIT
// =====================================

async function init() {

    await loadProfile();

    await loadSkills();

    await loadProjects();

    renderContacts();

}

// =====================================
// START
// =====================================

document.addEventListener("DOMContentLoaded", init);