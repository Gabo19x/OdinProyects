
export default function Card({imagen, funcion, click, SetClick}) {
    return(
        <div className="Card" onClick={(e) => funcion(click, SetClick)}>
            <img src={imagen} alt="Image" />
        </div>
    );
}