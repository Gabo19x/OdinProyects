import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Tienda from "../screens/tienda";
import Carro from "../screens/carro";
import MostrarObjeto from "../screens/mostrarObj";
import MostrarTodo from "../screens/mostrarTodo";
import CompraRealizada from "../screens/buy";

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Tienda></Tienda>,
        errorElement: <h2>❌ This page not found ❌</h2>,
        children: [
            {
                path: "food",
                element: <MostrarTodo></MostrarTodo>
            },
            {
                path: "element/:id",
                element: <MostrarObjeto></MostrarObjeto>
            },
            {
                path: "car",
                element: <Carro></Carro>
            },
            {
                path: "buy",
                element: <CompraRealizada></CompraRealizada>
            }
        ]
    }
]);

function MisRutas() {
    return(
        <RouterProvider router={rutas} />
    );
}

export default MisRutas;