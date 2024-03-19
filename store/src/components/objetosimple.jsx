export default function ObjetoSimple({titulo, imagen, precio, id, listaCarro, useListaCarrito, funcionBorrar}) {
    return (
        <section className="Objeto" >
            <h2>{titulo}</h2>
            <img src={imagen} alt="Food image" />
            <p>Units: {precio}</p>

            <button onClick={() => funcionBorrar(listaCarro, useListaCarrito, id)} >❌</button>
        </section>
    );
}