export default function MostrarDatos(props) {
    return(
        <section className="Mostrar">
            <h1>My data</h1>

            <div>
                <h2>I am...</h2>
                <p>My name is <span>{props.nombre}</span>, and to contact me by email: <span>{props.correo}</span> or by phone: <span>{props.tel}</span></p>
            </div>
            
            <div>
                <h2>I studied in...</h2>
                <p>I am a graduate of: <span>{props.uni}</span>; with a title in: <span>{props.titulo}</span>; in: <span>{props.fecha}</span></p>
            </div>
            
            <div>
                <h2>My experience is...</h2>
                <p>My skills are: <span>{props.hab}</span></p>
                <p>I have experience in: <span>{props.exp}</span></p>
            </div>
            
        </section>
    );
}