import { useEffect, useState } from "react";

/* HOOK
    Obtiene los datos de la API para devolverlos.
    @return datos; si esta cargando
*/
export default function UseApi() {
    const [data, setData] = useState({});
    const [cargando, setCargando] = useState(true);
    
    async function ObtenerApi() {
        try {
            const res = await fetch("https://toog-api-default-rtdb.firebaseio.com/remake.json");
            const data = await res.json();
            setData(data);
            setCargando(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        ObtenerApi();
    }, []);

    return {data, cargando};
}