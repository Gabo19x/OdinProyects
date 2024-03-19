import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

import useApi from "../hooks/useApi";
import Objeto from "../components/objeto";

export default function MostrarTodo() {
    const navegacion = useNavigate();
    const {data, cargando} = useApi();
    let [listaCar, AgregarAlCarrito] = useOutletContext();

    function Click(id) {
        navegacion(`/element/${id}`);
    }

    /* FUNCION
        Muestra todos los elementos de la api
        @return lista de objetos
    */
    function ContenidoRender() {
        let lista = [];

        for (let obj in data) {
            lista.push(
                <Objeto 
                key={`key-${data[obj].id}-key`} 
                titulo={data[obj].name} 
                imagen={data[obj].image} 
                precio={data[obj].price} 
                funcion={Click} 
                id={data[obj].id} 
                funcionAgregar={AgregarAlCarrito}
                listaCarro={listaCar}
                />
                
            );
        }
        
        return lista;
    }

    return(
        <>
            <main>
                {(cargando) 
                    ? <h2>⭕ Loading food...</h2>
                    : ContenidoRender() 
                }
            </main>

            <footer>
                <a href="https://github.com/Gabo19x">Powered by: GABO19</a>
            </footer>
        </>
    );
    
}