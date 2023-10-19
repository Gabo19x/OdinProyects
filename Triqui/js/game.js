// Variables
const textPlayerOne = document.getElementById("One");
const textPlayerTwo = document.getElementById("Two");

const gameBlocks = document.querySelectorAll(".Game_block");

let matrix = {
    "1": "", "2": "", "3": "",
    "4": "", "5": "", "6": "",
    "7": "", "8": "", "9": "",
}

let game = true; // Saber ai a terminado el juego
let player = true; // Que jugador es
let pointsOne = 0; // Puntos de jugador uno
let pointsTwo = 0; // Punstos de jugador dos


if(game > 9) {
    game = false;
}

document.addEventListener("click", (e) => {
    e.stopPropagation;
    SetGame(e);
});

/* FUNCTION
    Obtiene el objeto clickeado, y segun el jugador le asigna un valor.
    @params elemento clickeado
*/
function SetGame(e) {
    if(e.target.classList.contains("Game_block") && !e.target.classList.contains("Click") && game == true) {

        e.target.classList.add("Click");
        (player) ? e.target.textContent = "🔴" : e.target.textContent = "🔵";
        SetMatrix(e.target.id, player);
        player = !player;
        Verify();
    }
}

/* FUNCTION
    Asigna el valor en la matriz segun el obtenido
    @params posicion, valor jugador
*/
function SetMatrix(pos, value) {
    matrix[pos] = value;
}

/* FUNCTION
    Verifica si se ha hecho tres en linea
*/
function Verify() {
    
    if(matrix["1"] === matrix["2"] && matrix["1"] === matrix["3"] && matrix["1"] !== "") {
        ChangeAll();
    }
    else if(matrix["4"] === matrix["5"] && matrix["4"] === matrix["6"] && matrix["4"] !== "" ) {
        ChangeAll();
    }
    else if(matrix["7"] === matrix["8"] && matrix["7"] === matrix["9"] && matrix["7"] !== "") {
        ChangeAll();
    }
    else if(matrix["1"] === matrix["4"] && matrix["1"] === matrix["7"] && matrix["1"] !== "") {
        ChangeAll();
    }
    else if(matrix["2"] === matrix["5"] && matrix["2"] === matrix["8"] && matrix["2"] !== "") {
        ChangeAll();
    }
    else if(matrix["3"] === matrix["6"] && matrix["3"] === matrix["9"] && matrix["3"] !== "") {
        ChangeAll();
    }
    else if(matrix["1"] === matrix["5"] && matrix["1"] === matrix["9"] && matrix["1"] !== "") {
        ChangeAll();
    }
    else if(matrix["3"] === matrix["5"] && matrix["3"] === matrix["7"] && matrix["3"] !== "") {
        ChangeAll();
    }
    
}

/* FUNCTION
    Cambia todos los botones del juego a una version de unjugable
*/
function ChangeAll() {
    Point(!player);

    gameBlocks.forEach(element => {
        if(!element.classList.contains("Click")) { element.classList.add("Click"); }
    });
}

/* ARROW FUNCTION
    Da el punto segun el prop
    @params jugador
*/
const Point = (player) => {
    (player) ? pointsOne++ : pointsTwo++;

    textPlayerOne.textContent = pointsOne;
    textPlayerTwo.textContent = pointsTwo;
};

/* FUNCTION
    Reinicia el juego de manera parcial, o total
    @params si es reinicio total
*/
function Reset(total) {
    if(total) {
        pointsOne = 0;
        pointsTwo = 0;

        textPlayerOne.textContent = pointsOne;
        textPlayerTwo.textContent = pointsTwo;
    }

    gameBlocks.forEach(element => {
        if(element.classList.contains("Click")) { element.classList.remove("Click"); }
        element.textContent = "";
    });

    matrix = {
        "1": "", "2": "", "3": "",
        "4": "", "5": "", "6": "",
        "7": "", "8": "", "9": "",
    }
    
}