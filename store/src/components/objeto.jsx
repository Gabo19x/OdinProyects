export default function Objeto({titulo, imagen, precio, funcion, id, funcionAgregar, listaCarro}) {
    return (
        <section className="Objeto" onClick={() => funcion(id)}>
            <h2>{titulo}</h2>
            <img src={imagen} alt="Food image" />
            <p>${precio}</p>

            <button onClick={() => funcionAgregar(listaCarro, id)}>Add to car</button>
        </section>
    );
}