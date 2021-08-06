const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let numColumnas = 0;
let numFilas = 0;
let mesInicio;

/* Funcon que agrega una celda a la table */
function createCell(cell, text, tabla, tipo) {
    let div = document.createElement('div');
    let txt = document.createTextNode(text);
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    
    switch (tipo) {
        case 'head':
            div.appendChild(txt);                 
            cell.appendChild(div); 
            break;
        case 'text':
            div.appendChild(txt);
            cell.appendChild(div);
            break;
        case 'input':
            div.appendChild(input); 
            cell.appendChild(div); 
            break;
        case 'delete':
            const fila = numFilas;
            let boton = document.createElement('button');
            boton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>`
            boton.setAttribute('class', 'borrar btn btn-danger')
            if (tabla == 'tableRecursos') {
                boton.setAttribute('class', 'borrar-recursos btn btn-danger')
            }
            div.appendChild(boton); 
            cell.appendChild(div);  
        default:
          break;
    } 
}

/* Para agregar una columna */
function appendColumna(tabla, titulo) {
    var tbl = document.getElementById(`${tabla}`); // table reference
    for (let i = 0; i < tbl.rows.length; i++) {
        if (i == 0) {
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), titulo, tabla, 'head');
        } else {
            if (i == 1 && tabla != 'ingresos' && tabla != 'tableRecursos' && tabla != 'tableCostos') {
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), titulo, tabla, 'input');
            } else {
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), `${numColumnas}-${i}`, tabla,'text');
            }
        }
    }
}

/* Para agregar una fila */
function appendFila(tabla, titulo) {
    let tbl = document.getElementById(`${tabla}`);
    let row = tbl.insertRow(tbl.rows.length-1);
    for (let i = 0; i < tbl.rows[0].cells.length; i++) {
        if (i == 0) {
            createCell(row.insertCell(i), i, tabla, 'delete');
        } else {
            if (i == 1) {
                createCell(row.insertCell(i), titulo, tabla, 'head');
                
            } else {
                if (i == tbl.rows[0].cells.length - 1) {
                    createCell(row.insertCell(i), i, tabla, 'text');
                } else {
                    createCell(row.insertCell(i), i, tabla, 'input');
                } 
            }

        }
    }
    numFilas ++;
}

/* Main para agregar columnas a todas la tablas */
const agregarColumna = (mes) =>{
    appendColumna('tableFlujoEfectivo', mes);
    appendColumna('tableEdoResultados', mes);
    appendColumna('ingresos', mes);
    appendColumna('tableRecursos', mes);
    appendColumna('tableCostos', mes);
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

/* Elimina una columna. */
const eliminarColumna = (tabla) => {
    let table = document.getElementById(`${tabla}`); 
    let row = table.rows;  
    for (let j = 0; j < row.length; j++) {
        row[j].deleteCell(numColumnas);        
    }
}

/* Elimina la ultima columna en todas las tablas */
document.getElementById("deleteFlujoEfectivo").addEventListener("click", function(){
    if (numColumnas > 0) {
        eliminarColumna('tableFlujoEfectivo');
        eliminarColumna('tableEdoResultados');
        eliminarColumna('ingresos');
        mesInicio --;
        numColumnas --;
        if(numColumnas == 0) {
            const botonAgregar = document.getElementById('botonAgregar');
            botonAgregar.setAttribute('data-bs-toggle', 'modal');
            botonAgregar.setAttribute('data-bs-target', '#exampleModal');
            document.getElementById('botonEliminar').removeAttribute('data-bs-toggle');
            document.getElementById('botonEliminar').removeAttribute('data-bs-target');
            mesInicio = 1;
        }
    }
});


/* Agrega una fila a la tabla concepto */
document.getElementById('saveConcepto').addEventListener('click', function() {
    const concepto = document.getElementById('concepto').value;
    appendFila('ingresos', concepto);
});

/* Agregar fila a la tabla costos directos */
const costosDirectos = (event) => {
    event.preventDefault();
    const concepto = document.getElementById('concepto').value;
    const tipo = document.getElementById('tipo').value;
    if (tipo == 'null') {
        alert('Selecciona Un Tipo');
        return;
    }
    $('#costoDirectosModal').modal('hide');    
}



const agregarFilaRecursos = (event) => {
    event.preventDefault();
    $('#recursosModal').modal('hide');  
    const rol = document.getElementById('rol').value;
    appendFila('tableRecursos', rol);
    agregarSubRecursos('tableCostos', rol);
    agregarSubRecursos('tableCostosRecursos', rol);
}

const agregarSubRecursos = (tabla, titulo) => {
    let tbl = document.getElementById(`${tabla}`);
    let row = tbl.insertRow(tbl.rows.length-1);
    for (let i = 0; i < tbl.rows[0].cells.length; i++) {
        if (i == 0) {
            createCell(row.insertCell(i), titulo, tabla, 'head');
        } else {
            createCell(row.insertCell(i), i, tabla, 'text');
        }
    }
}


/* Elimina Una fila */
$(function () {
    $(document).on('click', '.borrar', function (event) {
        event.preventDefault();
        let opcion = confirm("¿Estás seguro?");
        if (opcion) {
            $(this).closest('tr').remove();
            numFilas --;
        }
    });
});

/* Elimina Una fila de recursos */
$(function () {
    $(document).on('click', '.borrar-recursos', function (event) {
        event.preventDefault();
        let opcion = confirm("¿Estás seguro?");
        if (opcion) {
            var i = $(this).closest('tr').index();
            $(this).closest('tr').remove();
            document.getElementById('tableCostos').deleteRow(i);
            document.getElementById('tableCostosRecursos').deleteRow(i);
        }
    });
});



agregar();