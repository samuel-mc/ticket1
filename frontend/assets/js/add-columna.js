/* Agregar una columna */
function appendColumna(tabla, titulo) {
    var tbl = document.getElementById(`${tabla}`); // table reference
    for (let i = 0; i < tbl.rows.length; i++) {
        if (i == 0) {
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), titulo, tabla, 'head');
        } else {
            if (i == 1 && tabla != 'ingresos' && tabla != 'tableCostos' && tabla != 'tableCostosRecursos') {
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), titulo, tabla, 'input');
            } else {
                if (i == tbl.rows.length - 1) {
                    createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), `${numColumnas}`, tabla,'total');
                } else {
                    createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), 0, tabla,'text');
                }
            }
        }
    }
}

/* Agrega una columna donde las celdas sean solo texto (no inputs) */
const addColTexto = (tabla, titulo) => {
    var tbl = document.getElementById(`${tabla}`); // table reference
    for (let i = 0; i < tbl.rows.length; i++) {
        if (i == 0) {
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), titulo, tabla, 'head');
        } else {
            if (i == tbl.rows.length - 1) {
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), `${numColumnas}`, tabla,'total');
            } else {
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), 0, tabla,'text');
            }
        }
    }
}

/* Agrega una columna cuando se requiere de un inputs*/
function addColInput(tabla, titulo) {
    var tbl = document.getElementById(`${tabla}`); // table reference
    for (let i = 0; i < tbl.rows.length; i++) {
        if (i == 0) {
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), titulo, tabla, 'head');
        } else {
            if (i == tbl.rows.length-1) {
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), `${numColumnas}`, tabla,'total');
            } else {
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), `${numColumnas}`, tabla,'input');
            }
            
        }
    }
}

/* Main para agregar columnas a todas la tablas */
const agregarColumna = (mes) =>{
    addColTexto('tableFlujoEfectivo', mes);
    addColTexto('tableEdoResultados', mes);
    appendColumna('ingresos', mes);
    addColInput('tableRecursos', mes);
    addColInput('tableCostosDirectos', mes);
    addColInput('tableGastosAdm', mes);
    appendColumna('tableCostos', mes);
    appendColumna('tableCostosRecursos', mes);
    numColumnas++;
    mesInicio++;
    if (mesInicio == 12) {
        mesInicio = 0;
    }
}

/* Funcion para agregar columnas de acuerdo al mes que elija el cliente. */
function agregar() {
    if (numColumnas === 0) {
        const saveFlujoEfectivo = document.getElementById("saveFlujoEfectivo");
        saveFlujoEfectivo.addEventListener('click', function () {
            const mes = document.getElementById("meses").value;
            mesInicio = meses.indexOf(mes);
            agregarColumna(mes);            
            document.getElementById('botonEliminar').setAttribute('data-bs-toggle', 'modal'); //Habilita la opcion eliminar columnas.
            document.getElementById('botonEliminar').setAttribute('data-bs-target', '#modalEliminar');
            document.getElementById('botonAgregar').removeAttribute('data-bs-toggle'); // Quita las opciones de seleccionar mes
            document.getElementById('botonAgregar').removeAttribute('data-bs-target');
        })            
    } 
}

/* Agrega columnas si ya hay al menos una */
document.getElementById('botonAgregar').addEventListener("click", function(event){
    if (numColumnas > 0) {
        agregarColumna(meses[mesInicio]); 
    }
});

agregar();