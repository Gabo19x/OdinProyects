import { useEffect, useState } from "react";

/* HOOK
    Un objeto el cual tiene los textosa en dos idiomas y segun cual es,
    devuelve un idioma u otro
    @params booleano si es en español.
    @return los textos segun el idioma
*/
export default function UseTextos(latino) {
    const [textos, SetTextos] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        
        const obj = {
            es: {
                tit: "Bienvenido al juego de la memoria",
                sub: "(Imagenes de la pagina: TooG inc) Dale click a cada imagen sin repetir para ganar :D",
                punt: "Puntuacion: ",
                titPer: "😨 HAS PERDIDO 😨, le has dado click dos veces a un mismo objeto.",
                titgan: "🤩 HAS GANADO 🤩, has logrado dar click sin repetir."
            },
            en: {
                tit: "Welcome to the memory game",
                sub: "(Images on the page: TooG inc) Click on each image without repeating to win :D",
                punt: "Score: ",
                titPer: "😨 YOU HAVE LOST 😨, you have clicked twice on the same object"
            }
        }

        const newTextos = latino ? obj.es : obj.en;
        SetTextos(newTextos);
        setCargando(false);

    }, []);

    return {textos, cargando};
}