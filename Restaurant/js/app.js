// Variables
const url = "https://flutter-apps-301cb-default-rtdb.firebaseio.com/products.json";
const temp = document.getElementById("Food_temp").content;
const main = document.getElementById("Main");
const form = document.querySelector(".Search");

let data = {};

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    GetData();
});

/* ASYNC FUNCTION or PROMISE
    Obtiene los datos de la api usando un metodo asincrono.
 */
async function GetData() {
    try {
        const res = await fetch(url);
        data = await res.json();
        ShowFood();
    } catch (error) {
        console.log(error);
    }
}

/* FUNCTION
    Muestra lo obtenido de la API y lo muestra correctamente.
 */
function ShowFood() {
    main.innerHTML = "";
    const fragment = document.createDocumentFragment();
    
    let llavesData = Object.keys(data);
    for (let i = 0; i < llavesData.length; i++) {
        let food = llavesData[i];
        
        const clone = temp.cloneNode(true);

        clone.querySelector("h2").textContent = data[food].name;
        clone.querySelector("p").textContent = `$${data[food].price}`;
        clone.querySelector("img").src = data[food].image;

        if(data[food].avalible === true) {
            clone.querySelector("article").classList.add("Food_card--True");
            clone.querySelector("h3").textContent = "Avalible";
            clone.querySelector("h3").classList.add("Food_card_avalible--true");
        } else {
            clone.querySelector("article").classList.add("Food_card--False");
            clone.querySelector("h3").textContent = "Not avalible";
            clone.querySelector("h3").classList.add("Food_card_avalible--false");
        }

        fragment.appendChild(clone);
    }

    main.appendChild(fragment);
}

/* ADDEVENTLISTENER
    Busca los alimentos que se parescan a lo que se busca
 */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = "";

    const inputs = document.querySelectorAll("input");
    const searchFood = inputs[0].value;
    const fragment = document.createDocumentFragment();

    let llavesData = Object.keys(data);
    for (let i = 0; i < llavesData.length; i++) {
        let food = llavesData[i];
        
        console.log(`${data[food].name} =? ${searchFood} | ${data[food].name.includes(searchFood)}`);
        if(data[food].name.includes(searchFood)) {
            const clone = temp.cloneNode(true);

            clone.querySelector("h2").textContent = data[food].name;
            clone.querySelector("p").textContent = `$${data[food].price}`;
            clone.querySelector("img").src = data[food].image;

            if(data[food].avalible === true) {
                clone.querySelector("article").classList.add("Food_card--True");
                clone.querySelector("h3").textContent = "Avalible";
                clone.querySelector("h3").classList.add("Food_card_avalible--true");
            } else {
                clone.querySelector("article").classList.add("Food_card--False");
                clone.querySelector("h3").textContent = "Not avalible";
                clone.querySelector("h3").classList.add("Food_card_avalible--false");
            }

            fragment.appendChild(clone);
        }
    }

    main.appendChild(fragment);
});
