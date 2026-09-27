# Reserva Aula - Documentación de Implementación

## Descripción
Sistema de reservas de aulas desarrollado con HTML, CSS y JavaScript vanilla. Permite registrar reservas, visualizar la disponibilidad de aulas y eliminar reservas existentes.

## Estructura del Proyecto

```
Sistema_de_reservas_de_aulas/
├── index.html      # Estructura de la interfaz
├── styles.css      # Estilos visuales
├── app.js          # Lógica de la aplicación
└── README.md       # Este archivo
```

## Archivos y sus Responsabilidades

### index.html
Contiene la estructura del formulario de reserva, la tabla de reservas y el contenedor de disponibilidad. Incluye los campos: aula (select), fecha (date), horario (select) y actividad (text).

### styles.css
Define los estilos para el formulario, tabla, mensajes de error/éxito e indicadores de disponibilidad. Usa clases CSS como `.libre` y `.ocupada` para los indicadores visuales.

### app.js
Contiene toda la lógica de la aplicación:
- Arreglo `reservas` en memoria
- Funciones de validación
- Manipulación dinámica del DOM
- Eventos de formulario y botones

## Funcionalidades Implementadas

### 1. Registrar Reserva
- Valida que todos los campos estén completos
- Verifica que no exista duplicado (misma aula + fecha + horario)
- Agrega la reserva al arreglo en memoria
- Crea dinámicamente una nueva fila en la tabla
- Muestra mensaje de éxito o error

### 2. Eliminar Reserva
- Busca la reserva en el arreglo por aula, fecha y horario
- Elimina la reserva del arreglo con `splice()`
- Remueve la fila de la tabla con `remove()`
- Actualiza los indicadores de disponibilidad

### 3. Mostrar Disponibilidad
- Recorre la lista de aulas
- Verifica si cada aula tiene reservas
- Muestra indicador visual (verde = libre, rojo = ocupada)

## Métodos del DOM Utilizados

| Método | Uso |
|--------|-----|
| `querySelector()` | Seleccionar elementos del formulario, tabla y contenedores |
| `addEventListener()` | Capturar eventos de submit y click |
| `createElement()` | Crear filas, celdas y botones dinámicamente |
| `appendChild()` | Agregar elementos al DOM |
| `remove()` | Eliminar filas de la tabla |
| `textContent` | Establecer texto de elementos |
| `classList` | Agregar clases CSS dinámicamente |
| `setAttribute()` | Agregar atributos data a los botones |

## Cómo Realizar Cambios Básicos

### Agregar un nuevo aula
1. En `index.html`, agregar una nueva `<option>` en el select de aula:
   ```html
   <option value="D401">D401</option>
   ```
2. En `app.js`, agregar el aula al arreglo `aulas`:
   ```javascript
   const aulas = ["A101", "A102", "B201", "B202", "C301", "D401"];
   ```

### Agregar un nuevo horario
En `index.html`, agregar una nueva `<option>` en el select de horario:
```html
<option value="18:00 - 20:00">18:00 - 20:00</option>
```

### Cambiar los colores de disponibilidad
En `styles.css`, modificar las clases `.libre` y `.ocupada`:
```css
.aula-disponibilidad.libre {
    background-color: #c8e6c9;  /* Cambiar color de fondo */
    color: #2e7d32;             /* Cambiar color de texto */
}
```

### Cambiar el tiempo de visualización de mensajes
En `app.js`, modificar el valor `4000` (milisegundos) en la función `mostrarMensaje`:
```javascript
setTimeout(() => {
    // ...
}, 5000); // Cambiar a 5 segundos
```

### Agregar un campo adicional al formulario
1. En `index.html`, agregar el nuevo campo:
   ```html
   <label for="profesor">Profesor:</label>
   <input type="text" id="profesor" placeholder="Nombre del profesor" required>
   ```
2. En `app.js`, obtener el valor en `registrarReserva`:
   ```javascript
   const profesor = document.querySelector("#profesor").value.trim();
   ```
3. Agregar el campo al objeto de reserva:
   ```javascript
   const nuevaReserva = {
       aula: aula,
       fecha: fecha,
       horario: horario,
       actividad: actividad,
       profesor: profesor
   };
   ```
4. Agregar la celda en `agregarFilaTabla`:
   ```javascript
   const tdProfesor = document.createElement("td");
   tdProfesor.textContent = reserva.profesor;
   fila.appendChild(tdProfesor);
   ```

## Casos de Prueba

| Caso | Acción | Resultado Esperado |
|------|--------|-------------------|
| 1 | Registrar una reserva válida | Aparece una nueva fila en la tabla |
| 2 | Intentar registrar la misma aula, fecha y horario | Se muestra mensaje de error |
| 3 | Registrar otra aula en el mismo horario | Se permite la reserva |
| 4 | Eliminar una reserva | La fila desaparece de la tabla |
| 5 | Volver a reservar el aula liberada | La reserva es aceptada |

## Requisitos del Navegador
- Cualquier navegador moderno (Chrome, Firefox, Edge, Safari)
- No requiere servidor ni dependencias externas
- Abrir `index.html` directamente en el navegador
