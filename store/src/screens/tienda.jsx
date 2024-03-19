import { useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

import Header from "../components/header";

export default function Tienda() {

    const navegacion = useNavigate();
    const [carrito, useCarrito] = useState([]);

    function AgregarAlCarrito(lista, idNuev) {
        let nuevaLista = [];
        let estaEnLista = false;

        lista.forEach(food => {
            if(food.id === idNuev) { 
                estaEnLista = true; 
                
            }

            
        });

        lista.forEach(food => {
            if(estaEnLista && food.id === idNuev) {
                food.cant += 1;
                console.log(`Se sumo 1 a: ${food.id}`);
                
            } 
        });

        if(!estaEnLista) {
            nuevaLista.push({"id": idNuev, "cant": 1});
            console.log(`Se agrego: ${idNuev}`);
        }

        useCarrito(lista.concat(nuevaLista));
    }

    return(
        <>
            <Header/>

            <nav>
                <button onClick={() => {navegacion("/food");}}>Food</button>
                <button onClick={() => {navegacion("/car");}}>My car</button>
            </nav>

            <Outlet context={[carrito, AgregarAlCarrito, useCarrito]}/>
        </>
        
    );
}