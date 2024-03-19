import { useEffect, useState } from "react";

export default function useApi() {
    const [data, setData] = useState({});
    const [cargando, setCargando] = useState(true);

    async function ObtenerApi() {
        try {
            const res = await fetch("https://flutter-apps-301cb-default-rtdb.firebaseio.com/products.json");
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