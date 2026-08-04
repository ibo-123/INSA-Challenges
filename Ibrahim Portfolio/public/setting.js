const API = "https://ibrahim-portfolio-dk91.onrender.com/api";


// ================= PROFILE =================


// Load Profile

async function getProfile(){

    try{

        const res = await fetch(`${API}/profile`);

        const result = await res.json();


        if(result.success){

            const profile = result.data;


            document.getElementById("name").value = profile.name;
            document.getElementById("title").value = profile.title;
            document.getElementById("bio").value = profile.bio;
            document.getElementById("profileImage").value = profile.profileImage;
            document.getElementById("problemsSolved").value = profile.problemsSolved;
            document.getElementById("university").value = profile.university;
            document.getElementById("email").value = profile.email;


            document.getElementById("github").value =
            profile.socialLinks.github;


            document.getElementById("linkedin").value =
            profile.socialLinks.linkedin;


            document.getElementById("codeforces").value =
            profile.socialLinks.codeforces;


            document.getElementById("leetcode").value =
            profile.socialLinks.leetcode;

        }


    }catch(error){

        console.log(error);

    }

}



// Update Profile


document
.getElementById("profileForm")
.addEventListener("submit", async(e)=>{

    e.preventDefault();


    const data = {


        name:
        document.getElementById("name").value,


        title:
        document.getElementById("title").value,


        bio:
        document.getElementById("bio").value,


        profileImage:
        document.getElementById("profileImage").value,


        problemsSolved:
        Number(document.getElementById("problemsSolved").value),


        university:
        document.getElementById("university").value,


        email:
        document.getElementById("email").value,


        socialLinks:{


            github:
            document.getElementById("github").value,


            linkedin:
            document.getElementById("linkedin").value,


            codeforces:
            document.getElementById("codeforces").value,


            leetcode:
            document.getElementById("leetcode").value

        }

    };



    const res = await fetch(`${API}/profile`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },


        body:JSON.stringify(data)

    });



    const result = await res.json();


    alert(result.message || "Profile updated");

});





// ================= SKILLS =================



async function getSkills(){

    try{

        const res = await fetch(`${API}/skills`);

        const result = await res.json();


        const box = document.getElementById("skillList");

        box.innerHTML = "";


        if(!result.success || !Array.isArray(result.data)){

            box.innerHTML = "<p>No skills available</p>";
            return;

        }


        result.data.forEach(skill=>{


            box.innerHTML += `

            <div class="item">

                <h3>${skill.name}</h3>

                <p>
                    ${skill.level || ""}
                </p>

                <i class="${skill.icon || ""}"></i>


                <button 
                class="delete"
                onclick="deleteSkill('${skill._id}')">

                    Delete

                </button>


            </div>

            `;


        });


    }catch(error){

        console.log("Skill Error:",error);

    }

}




// Add Skill


document
.getElementById("skillForm")
.addEventListener("submit",async(e)=>{


e.preventDefault();



const skill={


name:
document.getElementById("skillName").value,


icon:
document.getElementById("skillIcon").value,


level:
document.getElementById("skillLevel").value


};



await fetch(`${API}/skills`,{


method:"POST",


headers:{
"Content-Type":"application/json"
},


body:JSON.stringify(skill)


});



getSkills();



});




// Delete Skill


async function deleteSkill(id){


await fetch(`${API}/skills/${id}`,{


method:"DELETE"


});


getSkills();


}






// ================= PROJECTS =================



async function getProjects(){

    try{


        const res = await fetch(`${API}/projects`);

        const result = await res.json();


        const box = document.getElementById("projectList");

        box.innerHTML="";


        if(!result.success || !Array.isArray(result.data)){


            box.innerHTML = "<p>No projects available</p>";
            return;

        }



        result.data.forEach(project=>{


            box.innerHTML += `


            <div class="item">


                <h3>
                    ${project.name}
                </h3>


                <img 
                src="${project.image}"
                width="100"
                >


                <p>
                    ${project.description}
                </p>



                <button
                class="delete"
                onclick="deleteProject('${project._id}')">


                    Delete


                </button>


            </div>


            `;


        });



    }catch(error){

        console.log("Project Error:",error);

    }

}





// Add Project


document
.getElementById("projectForm")
.addEventListener("submit",async(e)=>{


e.preventDefault();



const project={


name:
document.getElementById("projectName").value,


description:
document.getElementById("projectDescription").value,


image:
document.getElementById("projectImage").value,


technologies:
document.getElementById("projectTechnologies")
.value
.split(","),



live:
document.getElementById("projectLive").value,



github:
document.getElementById("projectGithub").value,



featured:
document.getElementById("featured").checked


};




await fetch(`${API}/projects`,{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(project)


});



getProjects();


});





// Delete Project


async function deleteProject(id){


await fetch(`${API}/projects/${id}`,{


method:"DELETE"


});


getProjects();


}







// ================= START =================


getProfile();

getSkills();

getProjects();