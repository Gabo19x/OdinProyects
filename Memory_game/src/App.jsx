import { useEffect, useState } from 'react';

import Head from './components/head';
import useTextos from './hooks/useText';
import Game from './components/game';
import Pierde from './components/perdio';
import Gano from './components/ganar';

import './styles/style.css';

function App() {
  
  const [puntos, SetPuntos] = useState(0);
  const [finalizo, SetFinalizo] = useState(false);
  
  function Juego() {
    if(finalizo) {
      return(<Pierde/>);
    }else if(puntos >= 10) {
      return( <Gano/> );
    } else {
      console.log(puntos);
      return( <Game puntos={puntos} setPuntos={SetPuntos} setFinalizo={SetFinalizo}/> );
    }
  }

  return (
    <>
      <Head puntuacion={puntos} />

      { Juego() }
      
      <footer>
        <a href="https://github.com/Gabo19x">Powered by: GABO19</a>
      </footer>
    </>
  )
}

export default App
