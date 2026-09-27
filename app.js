// ============================================
// Reserva Aula - Lógica de la aplicación
// ============================================

// Arreglo en memoria para almacenar las reservas
let reservas = [];

// Lista de aulas disponibles
const aulas = ["A101", "A102", "B201", "B202", "C301"];

// ============================================
// Funciones de manipulación del DOM
// ============================================

/**
 * Muestra un mensaje en la interfaz (error o éxito)
 * @param {string} texto - Mensaje a mostrar
 * @param {string} tipo - 'error' o 'exito'
 */
function mostrarMensaje(texto, tipo) {
    const mensaje = document.querySelector("#mensaje");
    mensaje.textContent = texto;
    mensaje.className = tipo; // Aplica la clase CSS 'error' o 'exito'

    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
        mensaje.className = "";
        mensaje.style.display = "none";
    }, 4000);
    mensaje.style.display = "block";
}

/**
 * Verifica si un aula ya está reservada en una fecha y horario específicos
 * @param {string} aula - Aula a verificar
 * @param {string} fecha - Fecha a verificar
 * @param {string} horario - Horario a verificar
 * @returns {boolean} - true si ya existe una reserva
 */
function existeReserva(aula, fecha, horario) {
    return reservas.some(function (reserva) {
        return reserva.aula === aula && reserva.fecha === fecha && reserva.horario === horario;
    });
}

/**
 * Agrega una nueva reserva al arreglo y actualiza la interfaz
 */
function registrarReserva(event) {
    // Prevenir el envío tradicional del formulario
    event.preventDefault();

    // Obtener los valores del formulario usando querySelector
    const aula = document.querySelector("#aula").value;
    const fecha = document.querySelector("#fecha").value;
    const horario = document.querySelector("#horario").value;
    const actividad = document.querySelector("#actividad").value.trim();

    // Validar que todos los campos estén completos
    if (!aula || !fecha || !horario || !actividad) {
        mostrarMensaje("Todos los campos son obligatorios.", "error");
        return;
    }

    // Validar que no exista una reserva duplicada
    if (existeReserva(aula, fecha, horario)) {
        mostrarMensaje("El aula " + aula + " ya está reservada en esa fecha y horario.", "error");
        return;
    }

    // Crear objeto de reserva y agregarlo al arreglo
    const nuevaReserva = {
        aula: aula,
        fecha: fecha,
        horario: horario,
        actividad: actividad
    };
    reservas.push(nuevaReserva);

    // Actualizar la interfaz
    agregarFilaTabla(nuevaReserva);
    actualizarDisponibilidad();
    mostrarMensaje("Reserva registrada con éxito.", "exito");

    // Limpiar el formulario
    document.querySelector("#formulario-reserva").reset();
}

/**
 * Crea y agrega una fila a la tabla de reservas dinámicamente
 * @param {Object} reserva - Objeto con los datos de la reserva
 */
function agregarFilaTabla(reserva) {
    const tbody = document.querySelector("#tabla-reservas");

    // Crear un nuevo elemento <tr>
    const fila = document.createElement("tr");

    // Crear las celdas <td> con textContent
    const tdAula = document.createElement("td");
    tdAula.textContent = reserva.aula;

    const tdFecha = document.createElement("td");
    tdFecha.textContent = reserva.fecha;

    const tdHorario = document.createElement("td");
    tdHorario.textContent = reserva.horario;

    const tdActividad = document.createElement("td");
    tdActividad.textContent = reserva.actividad;

    // Crear celda con botón de eliminar
    const tdAccion = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.setAttribute("data-aula", reserva.aula);
    btnEliminar.setAttribute("data-fecha", reserva.fecha);
    btnEliminar.setAttribute("data-horario", reserva.horario);

    // Agregar evento click al botón de eliminar
    btnEliminar.addEventListener("click", function () {
        eliminarReserva(this);
    });

    tdAccion.appendChild(btnEliminar);

    // Agregar todas las celdas a la fila
    fila.appendChild(tdAula);
    fila.appendChild(tdFecha);
    fila.appendChild(tdHorario);
    fila.appendChild(tdActividad);
    fila.appendChild(tdAccion);

    // Agregar la fila al tbody
    tbody.appendChild(fila);
}

/**
 * Elimina una reserva del arreglo y actualiza la interfaz
 * @param {HTMLElement} boton - Botón de eliminar que fue clickeado
 */
function eliminarReserva(boton) {
    // Obtener los datos de la reserva desde los atributos del botón
    const aula = boton.getAttribute("data-aula");
    const fecha = boton.getAttribute("data-fecha");
    const horario = boton.getAttribute("data-horario");

    // Buscar el índice de la reserva en el arreglo
    const indice = reservas.findIndex(function (reserva) {
        return reserva.aula === aula && reserva.fecha === fecha && reserva.horario === horario;
    });

    // Eliminar la reserva del arreglo si existe
    if (indice !== -1) {
        reservas.splice(indice, 1);
    }

    // Eliminar la fila de la tabla usando remove()
    const fila = boton.closest("tr");
    fila.remove();

    // Actualizar la disponibilidad
    actualizarDisponibilidad();
    mostrarMensaje("Reserva eliminada. El aula está disponible nuevamente.", "exito");
}

/**
 * Actualiza los indicadores visuales de disponibilidad de las aulas
 */
function actualizarDisponibilidad() {
    const contenedor = document.querySelector("#disponibilidad");

    // Limpiar el contenedor
    contenedor.textContent = "";

    // Recorrer todas las aulas y crear un indicador para cada una
    aulas.forEach(function (aula) {
        const div = document.createElement("div");
        div.classList.add("aula-disponibilidad");

        // Verificar si el aula tiene al menos una reserva
        const estaOcupada = reservas.some(function (reserva) {
            return reserva.aula === aula;
        });

        if (estaOcupada) {
            div.textContent = aula + " - Ocupada";
            div.classList.add("ocupada");
        } else {
            div.textContent = aula + " - Libre";
            div.classList.add("libre");
        }

        contenedor.appendChild(div);
    });
}

// ============================================
// Inicialización de eventos
// ============================================

// Agregar evento submit al formulario
document.querySelector("#formulario-reserva").addEventListener("submit", registrarReserva);

// Mostrar disponibilidad inicial al cargar la página
actualizarDisponibilidad();
