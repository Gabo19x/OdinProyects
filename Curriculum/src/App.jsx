import { useState } from 'react'
import Form from './components/formulario';
import CV from './components/mostrar';
import Footer from './components/footer';

import './styles/style.css';

function App() {
  
  const [nombre, SetNombre] = useState('');
  const [correo, SetCorreo] = useState('');
  const [telefono, SetTelefono] = useState('');
  const [nombreUni, SetNombreUni] = useState('');
  const [titulo, SetTitulo] = useState('');
  const [fechaUni, SetFechaUni] = useState('');
  const [habil, SetHabil] = useState('');
  const [exp, SetExp] = useState('');

  return (
    <main>
      <Form 
        Nombre={SetNombre}
        Correo={SetCorreo}
        Tel={SetTelefono}
        NombreU={SetNombreUni}
        Titulo={SetTitulo}
        FechaU={SetFechaUni}
        Habilidades={SetHabil}
        Experiencia={SetExp}
      />

      <CV
        nombre={nombre}
        correo={correo}
        tel={telefono}
        uni={nombreUni}
        titulo={titulo}
        fecha={fechaUni}
        hab={habil}
        exp={exp}
      />

      <Footer/>
    </main>
  )
}

export default App
