/* Elimina una columna. */
const eliminarColumna = (tabla) => {
    let table = document.getElementById(`${tabla}`); 
    let row = table.rows;  
    for (let j = 0; j < row.length; j++) {
        if (tabla == 'ingresos' || tabla == 'tableRecursos') {
            row[j].deleteCell(numColumnas + 1); 
        } else {
            row[j].deleteCell(numColumnas);        
        }
    }
}

/* Elimina la ultima columna en todas las tablas */
document.getElementById("deleteFlujoEfectivo").addEventListener("click", function(){
    if (numColumnas > 0) {
        eliminarColumna('tableFlujoEfectivo');
        eliminarColumna('tableEdoResultados');
        eliminarColumna('ingresos');
        eliminarColumna('tableRecursos');
        eliminarColumna('tableCostos');
        eliminarColumna('tableCostosRecursos');
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
            // document.getElementById('tableCostosRecursos').deleteRow(i);
            totalFilaPorcentajes('tableRecursos');
            totalColumnaPorcentajes('tableRecursos');
            actualizarCostsRecs();
            totalFila('tableCostosRecursos');
            totalColumna('tableCostosRecursos');
        }
    });
});