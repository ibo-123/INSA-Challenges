const search = document.getElementById("search");
const items = document.querySelectorAll(".item");

search.addEventListener("keyup", function () {
    const text = search.value.toLowerCase();

    items.forEach(item => {
        const name = item.querySelector(".name").textContent.toLowerCase();

        if (name.includes(text)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});