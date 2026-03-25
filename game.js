const GANA_A = { tijera: "papel", papel: "piedra", piedra: "tijera" };
const EMOJIS = { piedra: "✊", papel: "✋", tijera: "✌️" };
const MAX = 3;

let puntaje = { jugador: 0, sofIA: 0 };
let ronda = 0;

function elegirCPU() {
    const opciones = ["piedra", "papel", "tijera"];
    return opciones[Math.floor(Math.random() * 3)];
}

function evaluar(jugador, sofIA) {
    if (jugador === sofIA) return "Empateichon";
    return GANA_A[jugador] === sofIA ? "win" : "lose";
}

function jugar() {
    const jugada = document.getElementById("seleccion").value;
    const jugadaCpu = elegirCPU();
    const resultado = evaluar(jugada, jugadaCpu);

    ronda++;
    if (resultado === "win")  puntaje.jugador++;
    if (resultado === "lose") puntaje.sofIA++;

  // Actualizar emojis
    document.getElementById("mano-jugador").textContent = EMOJIS[jugada];
    document.getElementById("mano-sofIA").textContent     = EMOJIS[jugadaCpu];

  // Actualizar marcador
    document.getElementById("pts-jugador").textContent = puntaje.jugador;
    document.getElementById("pts-sofIA").textContent     = puntaje.sofIA;

  // Actualizar resultado
    const textos = {
      win:  `¡Ganaste! ${jugada} vence a ${jugadaCpu}`,
      lose: `Perdiste. ${jugadaCpu} vence a ${jugada}`,
      draw: `Empateichon. Ambos eligieron ${jugada}`,
    };
    const div = document.getElementById("resultado");
    div.textContent = textos[resultado];
    div.className = resultado;

  // Agregar al historial
    const li = document.createElement("li");
    const etiqueta = { win: " Victoria", lose: " Derrota", draw: " Empateichon" };
    li.textContent = `Ronda ${ronda}: ${EMOJIS[jugada]} vs ${EMOJIS[jugadaCpu]} — ${etiqueta[resultado]}`;
    const lista = document.getElementById("lista-historial");
    if (ronda === 1) lista.innerHTML = ""; // quitar texto inicial
    lista.insertBefore(li, lista.firstChild);
  
  // Verificar fin del juego
    if (puntaje.jugador >= MAX || puntaje.sofIA >= MAX) {
      const ganador = puntaje.jugador >= MAX ? "Ganaste el juego " : "sofIA gano el juego ";
      document.getElementById("modal-mensaje").textContent = ganador;
      document.getElementById("modal").classList.remove("oculto");
      document.getElementById("btn-jugar").disabled = true;
    }
}

function reiniciar() {
    puntaje = { jugador: 0, sofIA: 0 };
    ronda = 0;

    document.getElementById("pts-jugador").textContent = "0";
    document.getElementById("pts-sofIA").textContent     = "0";
    document.getElementById("mano-jugador").textContent = "?";
    document.getElementById("mano-sofIA").textContent     = "?";
    document.getElementById("resultado").textContent    = "Elige tu jugada y presiona Jugar";
    document.getElementById("resultado").className      = "";
    document.getElementById("lista-historial").innerHTML = "<li>El historial aparecerá aquí…</li>";
    document.getElementById("modal").classList.add("oculto");
    document.getElementById("btn-jugar").disabled = false;
}

document.getElementById("btn-jugar").addEventListener("click", jugar);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);