class Nave {
  constructor(tipo, tamaño) {
    // this.ubicacion = [];
    this.tamaño = tamaño;

    if(tipo == 0) { this.vida = 5; } // Portaaviones
    else if(tipo == 1) { this.vida = 4; } // Crucero
    else { this.vida = 3; } // Fragata

    this.vivo = true;
  }

  Daño() {
    this.vida -= 1;
    if(this.vida <= 0) { this.vivo = false; }
  }

  // SetUbicacion(ub) {
  //   this.ubicacion = ub;
  // }
}

// TABLERO
//#region 
// Definir el tamaño del tablero
const filas = 3;
const columnas = 3;

// Función para crear un objeto de celda
function CrearCelda() {
  return {
    barco: null,
    id: GetRandomInt(1000),
  };
}

// TABLERO JUGADOR
const tablero = Array.from({ length: filas }, () =>
  Array.from({ length: columnas }, () => CrearCelda())
);

// TABLERO BOT
const tableroBot = Array.from({ length: filas }, () =>
  Array.from({ length: columnas }, () => CrearCelda())
);
//#endregion

// UBICAR BARCOS
/* FUNCION
    Ubica los barcos segun la orientecion y su posicion inicial
    @params tablero de juego; fila de inicio; columna de inicio; longitud; orientacion; la nave
 */
function UbicarBarco(tablero, filaInicio, columnaInicio, longitud, orientacion, nave) {
  if (
    filaInicio < 0 ||
    filaInicio >= filas ||
    columnaInicio < 0 ||
    columnaInicio >= columnas
  ) {
    console.log("|Error| Limites iniciales excedidos");
    return;
  }

  let filaActual = filaInicio;
  let columnaActual = columnaInicio;

  for (let i = 0; i < longitud; i++) {
    if (
      filaActual < 0 ||
      filaActual >= filas ||
      columnaActual < 0 ||
      columnaActual >= columnas
    ) {
      console.log("|Error| Limites excedidos");
      return;
    }

    if (tablero[filaActual][columnaActual].barco) {
      return;
    }

    tablero[filaActual][columnaActual].barco = nave;

    if (orientacion === "h") {
      columnaActual++;
    } else {
      filaActual++;
    }
  }
}

// AGREGAR NAVES
/* FUNCION
    Genera un numero aleatorio
    @params limite 
    @rturn retorna el numero
 */
function GetRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Jugador
const portaAviones = new Nave(0, 2);
UbicarBarco(tablero, GetRandomInt(tablero.length - 1), GetRandomInt(tablero.length - 1), portaAviones.tamaño, "h", portaAviones);

// Bot
const portaAvionesBot = new Nave(0, 2);
UbicarBarco(tableroBot, GetRandomInt(tablero.length - 1), GetRandomInt(tablero.length - 1), portaAviones.tamaño, "v", portaAviones);

// CREAR TABLERO
const zonaJug = document.getElementById("Tablero-jug");
const zonaBot = document.getElementById("Tablero-bot");

const casillaTemp = document.getElementById("Temp-casilla").content;
const clone = casillaTemp.cloneNode(true);
// const fragment = document.createDocumentFragment();

// Jugador
tablero.forEach(lista => {
  lista.forEach(cas => {
    const clone = casillaTemp.cloneNode(true);
    clone.querySelector("div").dataset.id = cas.id;
    clone.querySelector("div").classList.add("Casilla_jug");

    if(cas.barco !== null) {
      clone.querySelector("h1").textContent = "jug";
    }

    zonaJug.appendChild(clone);
  });
});

// Bot
tableroBot.forEach(lista => {
  lista.forEach(cas => {
    const clone = casillaTemp.cloneNode(true);
    clone.querySelector("div").dataset.id = cas.id;
    clone.querySelector("div").classList.add("Casilla_bot");

    if(cas.barco !== null) {
      clone.querySelector("h1").textContent = "Bot";
    }

    zonaBot.appendChild(clone);
  });
});


// JUEGO
let juego = true;
let turnoJug = true;

/* FUNCION
    Busca la casilla si tiene un objeto en el o no.
    @paramas tablero
    @return si tiene algo no
 */
function Buscar(tablero, idb) {
  let sies = false;
  tablero.forEach(lista => {
    lista.forEach(obj => {
      
      if(obj.barco != null && obj.id == idb) { sies = true; }
    });
  });

  return sies;
}

/* FUNCION
    Hace daño al barco en especifico
*/
function HacerDañoBarco(tablero, idb) {
  tablero.forEach(lista => {
    lista.forEach(obj => {
      
      if(obj.barco != null && obj.id == idb) { 
        obj.barco.Daño();
        console.log(obj.barco);
      }
    });
  });
}

/* FUNCION
    Verfica con la cantidad de barcos si estan destruidos o no
 */
function BuscarRevisarVida(tablero, cb) {
  let noTiene = false;
  let ida = null;
  let cantidadBarcos = cb;

  tablero.forEach(lista => {
    lista.forEach(obj => {
      
      if(obj.barco != null && obj.id != ida) {
        if(obj.barco.vivo) {
          cantidadBarcos--;
          ida = obj.id;
        }
      }
    });
  });

  if(cantidadBarcos == 0) {
    noTiene = true;
  }

  return noTiene;
}

document.addEventListener("click", (e) => {
  e.preventDefault();

  if(turnoJug && e.target.classList.contains("Tablero_casilla")) {
    if(e.target.classList.contains("Casilla_bot") && !e.target.classList.contains("Casilla_barco")) {

      e.target.classList.remove("Casilla_nada");

      let bandera = Buscar(tableroBot, e.target.dataset.id);
      if(bandera) {
        e.target.classList.add("Casilla_barco");
        HacerDañoBarco(tableroBot, e.target.dataset.id);
      } else {
        e.target.classList.add("Casilla_vacia");
      }
      
      // turnoJug = false;
    } else {
      console.log("Dispara a otra casilla");
    }
    
    
    juego = false;
  }
});

while(juego) {
  // if(turnoJug) {
  //   console.log("En juego");
  // }
  let final = BuscarRevisarVida(tableroBot, 1);
  if(final) { juego = false; }
}

