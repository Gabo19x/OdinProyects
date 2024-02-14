/* COMPONENTE
    Es el formulario el cual con los props guardara los datos
    @params funciones de guardado
 */
export default function Formulario(
    {Nombre, Correo, Tel, NombreU, Titulo, FechaU, Habilidades, Experiencia}
    ) {
    return (
        <section className="Form">
            <h1>Fill in the data</h1>
            <form action="">
                <div>
                <label htmlFor="Nombre">Name:</label>
                <input type="text" id="Nombre" placeholder="Your name here" onChange={(e) => Nombre(e.target.value)}/>
                </div>
                
                <div>
                <label htmlFor="Correo">Mail:</label>
                <input type="mail" id="Correo" placeholder="Your mail here" onChange={(e) => Correo(e.target.value)}/>
                </div>
                
                <div>
                <label htmlFor="Tel">Phone number:</label>
                <input type="number" id="Tel" placeholder="Your phone number here" onChange={(e) => Tel(e.target.value)}/>
                </div>
                
                <div>
                <label htmlFor="NombreU">University name:</label>
                <input type="text" id="NombreU" placeholder="University name here" onChange={(e) => NombreU(e.target.value)}/>
                </div>
                
                <div>
                <label htmlFor="Titulo">College degree:</label>
                <input type="text" id="Titulo" placeholder="Your college degree here" onChange={(e) => Titulo(e.target.value)}/>
                </div>
                
                <div>
                <label htmlFor="FechaU">Date of graduation:</label>
                <input type="Date" id="FechaU" onChange={(e) => FechaU(e.target.value)}/>
                </div>
                
                <div>
                <label htmlFor="Habilidades">Habilities:</label>
                <textarea type="text" id="Habilidades" maxLength={400} placeholder="Your habilities here" onChange={(e) => Habilidades(e.target.value)} />
                </div>
                
                <div>
                <label htmlFor="Experiencia">Experience:</label>
                <textarea type="text" id="Experiencia" placeholder="Your experience here" onChange={(e) => Experiencia(e.target.value)} />
                </div>
                
            </form>
        </section>
    );
}