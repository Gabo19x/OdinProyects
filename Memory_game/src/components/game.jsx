import { useState } from 'react';
import useApi from '../hooks/useApi';

import Card from './card';

/* COMPONENTE
    Guarda y crea los elementos y los organiza aleatoriamente para el juego.
    @params puntos; funcion set de puntos y de finalizar juego
*/
export default function Game({puntos, setPuntos, setFinalizo}) {

    const [ban0, setBan0] = useState(false);
    const [ban1, setBan1] = useState(false);
    const [ban2, setBan2] = useState(false);
    const [ban3, setBan3] = useState(false);
    const [ban4, setBan4] = useState(false);
    const [ban5, setBan5] = useState(false);
    const [ban6, setBan6] = useState(false);
    const [ban7, setBan7] = useState(false);
    const [ban8, setBan8] = useState(false);
    const [ban9, setBan9] = useState(false);

    let ele0 = <></>;
    let ele1 = <></>; 
    let ele2 = <></>; 
    let ele3 = <></>; 
    let ele4 = <></>; 
    let ele5 = <></>; 
    let ele6 = <></>; 
    let ele7 = <></>; 
    let ele8 = <></>;
    let ele9 = <></>; 

    const {data, cargando} = useApi();
    // (cargando) ? console.log("Cargando") : console.log(data);

    /* FUNCION
        Click para guardar y saber si al objeto ya se le dio click.
        @params booleano click; y la funcion set
    */
    function HizoClick(click, SetClick) {
        if(click == false) { SetClick(true); setPuntos(puntos += 1); }
        else if(click == true) { setFinalizo(true); }
    }

    if(cargando == false) {
        ele0 = <Card key={"000"} imagen={data[0].imagen} funcion={HizoClick} click={ban0} SetClick={setBan0}/>;
        ele1 = <Card key={"111"} imagen={data[1].imagen} funcion={HizoClick} click={ban1} SetClick={setBan1}/>;
        ele2 = <Card key={"222"} imagen={data[2].imagen} funcion={HizoClick} click={ban2} SetClick={setBan2}/>;
        ele3 = <Card key={"333"} imagen={data[3].imagen} funcion={HizoClick} click={ban3} SetClick={setBan3}/>;
        ele4 = <Card key={"444"} imagen={data[4].imagen} funcion={HizoClick} click={ban4} SetClick={setBan4}/>;
        ele5 = <Card key={"555"} imagen={data[5].imagen} funcion={HizoClick} click={ban5} SetClick={setBan5}/>;
        ele6 = <Card key={"666"} imagen={data[6].imagen} funcion={HizoClick} click={ban6} SetClick={setBan6}/>;
        ele7 = <Card key={"777"} imagen={data[7].imagen} funcion={HizoClick} click={ban7} SetClick={setBan7}/>;
        ele8 = <Card key={"888"} imagen={data[8].imagen} funcion={HizoClick} click={ban8} SetClick={setBan8}/>;
        ele9 = <Card key={"999"} imagen={data[9].imagen} funcion={HizoClick} click={ban9} SetClick={setBan9}/>;
    }
    
    /* FUNCION
        Genera un numero random
        @params numero maximo
        @return el numero aleatorio
    */
    function GetNumero(max) {
        return Math.floor(Math.random() * max);
    } 

    /* FUNCION
        Con los elementos en una lista, se organizan de manera aleatoria para su uso.
        @parmas lista de los elementos aleatorios
     */
    function Generar() {
        let lista = [];
        let elementos = [ele0, ele1, ele2, ele3, ele4, ele5, ele6, ele7, ele8, ele9];

        while (lista.length < 10) {
            let r = GetNumero(10);

            if (!lista.includes(elementos[r])) {
                lista.push(elementos[r]); 
            }
        }

        return lista;
    }

    return(
        <main>
            {(cargando) ? <h2>Loading...</h2> : Generar()}
        </main>
    );
}