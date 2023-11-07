// Variables
const url = "https://flutter-apps-301cb-default-rtdb.firebaseio.com/products";
const temp = document.getElementById("Food_temp").content;
const main = document.getElementById("Main");

let data = "";

document.addEventListener('DOMContentLoaded', () => {
    GetData();
});

async function GetData() {
    try {
        const res = await fetch(url);
        data = await res.json();
        console.log(data);
        ShowFood(data);
    } catch (error) {
        console.log(error);
    }
}

function ShowFood(data) {
    main.innerHTML = "";
    const fragment = document.createDocumentFragment();

    data.forEach(food => {
        const clone = temp.cloneNode(true);

        clone.querySelector("h2").textContent = food.name;
        clone.querySelector("p").textContent = `$${food.price}`;

        if(food.avalible === true) {
            clone.querySelector("article").classList.add("Food_card--True");
            clone.querySelector("h3").textContent = "Avalible";
            clone.querySelector("h3").classList.add("Food_card_avalible--true");
        } else {
            clone.querySelector("article").classList.add("Food_card--False");
            clone.querySelector("h3").textContent = "Not avalible";
            clone.querySelector("h3").classList.add("Food_card_avalible--false");
        }

        fragment.appendChild(clone);
    });

    main.appendChild(fragment);
}