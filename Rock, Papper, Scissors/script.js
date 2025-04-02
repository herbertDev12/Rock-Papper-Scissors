document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const buttons = document.querySelectorAll('[data-jugada]');
    const resultadoDiv = document.getElementById('resultado');
    const marcadorDiv = document.getElementById('marcador');
    
    const estado = {
        victorias: 0,
        derrotas: 0,
        empates: 0,
        opciones: ['piedra', 'papel', 'tijeras'],
        reglas: {
            piedra: 'tijeras',
            papel: 'piedra',
            tijeras: 'papel'
        }
    };

    function eleccionComputadora() {
        const indice = Math.floor(Math.random() * 3);
        return estado.opciones[indice];
    }

    function determinarGanador(usuario, computadora) {
        if (usuario === computadora) return 'empate';
        return estado.reglas[usuario] === computadora ? 'ganaste' : 'perdiste';
    }

    function animarSeleccion(button) {
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = '#777';
        setTimeout(() => {
            button.style.transform = 'scale(1.05)';
            button.style.backgroundColor = '#555';
        }, 150);
    }

    
    function actualizarMarcador(resultado) {
        if (resultado === 'ganaste') estado.victorias++;
        else if (resultado === 'perdiste') estado.derrotas++;
        else estado.empates++;
        
        marcadorDiv.innerHTML = `
            <span class="victorias">Victorias: ${estado.victorias}</span> | 
            <span class="derrotas">Derrotas: ${estado.derrotas}</span> | 
            <span class="empates">Empates: ${estado.empates}</span>
        `;
    }

    
    function mostrarResultado(usuario, computadora, resultado) {
        const emojis = {
            piedra: '🪨',
            papel: '📄',
            tijeras: '✂️'
        };
        
        resultadoDiv.innerHTML = `
            <div class="seleccion">
                <span class="jugador">Tú: ${emojis[usuario]}</span>
                <span class="vs">VS</span>
                <span class="computadora">PC: ${emojis[computadora]}</span>
            </div>
            <div class="resultado-texto ${resultado}">${resultado.toUpperCase()}!</div>
        `;
    }

    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const eleccionUsuario = button.dataset.jugada;
            const eleccionComp = eleccionComputadora();
            const resultado = determinarGanador(eleccionUsuario, eleccionComp);
            
            animarSeleccion(button);
            actualizarMarcador(resultado);
            mostrarResultado(eleccionUsuario, eleccionComp, resultado);
        });
    });
});