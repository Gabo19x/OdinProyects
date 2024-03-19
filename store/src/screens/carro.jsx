import { useNavigate, useOutletContext } from "react-router-dom";

import useApi from "../hooks/useApi";
import ObjetoSimple from "../components/objetosimple";
import { useEffect, useState } from "react";

export default function Carro() {
    const [lista, useCarrito] = useOutletContext();
    const {data, cargando} = useApi();
    const [listaRender, setListaRender] = useState([]);
    const [precioTotal, usePrecioTotal] = useState(0);
    const navegacion = useNavigate();

    function Eliminar(lista, use, idBor) {
        use(lista.filter((food) => food.id !== idBor));
    }

    /* USEEFFECT
        1. Busca y filtra todos los alimentos que existen y crea un nuevo componente.
        2. Toma el precio de cada alimento y lo suma

        [] se ejecutara cuando: lista o data, cambien
    */
    useEffect(() => {
        const nuevaListaRender = lista
            .filter(obj => data[obj.id] !== undefined)
            .map(obj => (
                <ObjetoSimple
                    key={`key-${obj.id}-key`} 
                    titulo={data[obj.id].name} 
                    imagen={data[obj.id].image} 
                    precio={obj.cant} 

                    id={obj.id}
                    listaCarro={lista}
                    useListaCarrito={useCarrito}
                    funcionBorrar={Eliminar}
                />
            ));
        setListaRender(nuevaListaRender);

        let num = 0;
        lista.forEach(food => {
            if(data[food.id] !== undefined) {
                
                num += data[food.id].price * food.cant;
            }
            
        });
        usePrecioTotal(num);

    }, [lista, data]);

    return(
        <>
            <main className="Carro">
                <section className="Acomprar">
                    {(cargando)
                        ? <h2>⭕ Loading your food...</h2>
                        : (listaRender.length == 0) ? <h2>❕ You don't have food</h2> : listaRender
                    }
                </section>
                

                <section className="Total">
                    <p>Total: ${precioTotal}</p>
                    <button onClick={() => navegacion("/buy")}>Buy</button>
                </section>
            </main>

            <footer>
                <a href="https://github.com/Gabo19x">Powered by: GABO19</a>
            </footer>
        </>
        
    );
}