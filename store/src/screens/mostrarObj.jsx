import {useParams} from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import useApi from "../hooks/useApi";
import Objeto from "../components/objeto";

export default function MostrarObjeto() {
    const {id} = useParams();
    const {data, cargando} = useApi();
    let [lista, AgregarAlCarrito] = useOutletContext();

    return(
        <>
            {(cargando)
                ? <h2>⭕ Loading food...</h2>
                : <Objeto
                    key={`key-${data[id].id}-key`} 
                    titulo={data[id].name} 
                    imagen={data[id].image} 
                    precio={data[id].price} 
                    funcion={() => { }} 
                    id={data[id].id}
                    funcionAgregar={AgregarAlCarrito}
                    listaCarro={lista}
                />
            }

            <footer>
                <a href="https://github.com/Gabo19x">Powered by: GABO19</a>
            </footer>
        </>
        
    );
}