class Nodo {
    constructor(valor) {
        this.dato = valor;
        this.hijoIzq = null;
        this.hijoDer = null;
    }

    Agregar(valor) {
        if(valor < this.dato) { this.AgregarHijoIzq(valor); } 
        else { this.AgregarHijoDer(valor); }
    }

    AgregarHijoIzq(valor) {
        if(this.hijoIzq) {
            this.hijoIzq.Agregar(valor);
        } else {
            this.hijoIzq = new Nodo(valor);
        }
        
    }

    AgregarHijoDer(valor) {
        if(this.hijoDer) {
            this.hijoDer.Agregar(valor);
        } else {
            this.hijoDer = new Nodo(valor);
        }
    }

    
}

function EscrituraConsola(nodo, prefix = '', isLeft = true) {
    if (nodo.hijoDer !== null) {
        EscrituraConsola(nodo.hijoDer, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└──> ' : '┌──> '}${nodo.dato}\n`);
    if (nodo.hijoIzq !== null) {
        EscrituraConsola(nodo.hijoIzq, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const N = new Nodo(8);
N.Agregar(12);
N.Agregar(6);
N.Agregar(3);
N.Agregar(56);
N.Agregar(10);
N.Agregar(9);
N.Agregar(6);
N.Agregar(21);
N.Agregar(2);

console.log("Binary tree:");
EscrituraConsola(N);
