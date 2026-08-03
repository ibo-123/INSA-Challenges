const icons = [

{
 name:"React",
 icon:"fa-brands fa-react"
},

{
 name:"JavaScript",
 icon:"fa-brands fa-js"
},

{
 name:"Python",
 icon:"fa-brands fa-python"
},

{
 name:"Node.js",
 icon:"fa-brands fa-node-js"
},

{
 name:"Git",
 icon:"fa-brands fa-git-alt"
},

{
 name:"Docker",
 icon:"fa-brands fa-docker"
}

];



const container = document.getElementById(
    "iconContainer"
);


function showIcons(list){


    container.innerHTML = "";


    // No icon option
    container.innerHTML += `
        <button onclick="selectIcon(null)">
            No Icon
        </button>
    `;


    list.forEach(item=>{


        container.innerHTML += `

        <button onclick="selectIcon('${item.icon}')">

            <i class="${item.icon}"></i>

            <p>${item.name}</p>

        </button>

        `;


    });


}



showIcons(icons);
