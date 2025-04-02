let victorias = 0;
let derrotas = 0;
let empates = 0;

function eleccionComputadora() {
    const opciones = ['piedra', 'papel', 'tijeras'];
    const indice = Math.floor(Math.random() * 3); // Número aleatorio entre 0-2
    return opciones[indice];
}

function determinarGanador(usuario, computadora) {
    if (usuario === computadora) return 'empate';
    
    const reglas = {
        piedra: 'tijeras',
        papel: 'piedra',
        tijeras: 'papel'
    };
    
    return reglas[usuario] === computadora ? 'ganaste' : 'perdiste';
}

function jugar(eleccionUsuario) {
    const eleccionComp = eleccionComputadora();
    const resultado = determinarGanador(eleccionUsuario, eleccionComp);
    
    // Actualizar marcador
    if (resultado === 'ganaste') victorias++;
    else if (resultado === 'perdiste') derrotas++;
    else empates++;
    
    // Mostrar resultados
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        Tú elegiste: ${eleccionUsuario}<br>
        La computadora eligió: ${eleccionComp}<br>
        <strong>${resultado.toUpperCase()}!</strong>
    `;
    
    // Actualizar marcador en pantalla
    document.getElementById('marcador').textContent = 
        `Victorias: ${victorias} | Derrotas: ${derrotas} | Empates: ${empates}`;
}