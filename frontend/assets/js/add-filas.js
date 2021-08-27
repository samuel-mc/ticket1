/* Agregar una fila */
function appendFila(tabla, titulo) {
    let tbl = document.getElementById(`${tabla}`);
    let row = tbl.insertRow(tbl.rows.length-1);
    for (let i = 0; i < tbl.rows[0].cells.length; i++) {
        if (i == 0) {
            createCell(row.insertCell(i), '', `${tabla}`, 'delete');
        } else {
            if (i == 1) {
                createCell(row.insertCell(i), titulo, `${tabla}`, 'head');
                
            } else {
                if (i == tbl.rows[0].cells.length - 1) {
                    createCell(row.insertCell(i), 0, `${tabla}`, 'total');
                } else {
                    createCell(row.insertCell(i), i, `${tabla}`, 'input');
                } 
            }

        }
    }
}

/* Agrega una fila a la tabla ingresos */
const saveConcepto = (event) => {
    event.preventDefault();
    $('#conceptoModal').modal('hide');  
    const concepto = document.getElementById('concepto').value;
    appendFila('ingresos', `${concepto}`);
    numFilas++;
}

/* Agregar fila a la tabla costos directos */
const costosDirectos = (event) => {
    event.preventDefault();
    const concepto = document.getElementById('conceptoCostoDirecto').value;
    const tipo = document.getElementById('tipo').value;
    if (tipo == 'null') {
        alert('Selecciona Un Tipo');
        return;
    }
    if (tipo == 'campolibre') {
        appendFila('tableCostosDirectos', `${concepto}`);
    }
    if (tipo == 'sumatoria') {
        let tbl = document.getElementById('tableCostosDirectos');
        let row = tbl.insertRow(tbl.rows.length-1);
        for (let i = 0; i < tbl.rows[0].cells.length; i++) {
            if (i == 0) {
                createCell(row.insertCell(i), '', 'tableCostosDirectos', 'delete');
            } else {
                if (i == 1) {
                    createCell(row.insertCell(i), concepto, 'tableCostosDirectos', 'head');
                    
                } else {
                    if (i == tbl.rows[0].cells.length - 1) {
                        createCell(row.insertCell(i), 0, 'tableCostosDirectos', 'total');
                    } else {
                        createCell(row.insertCell(i), i, 'tableCostosDirectos', 'text');
                    } 
                }
                
            }
        }
        $('#opcionesCDModal').modal('show');    
    }
    if (tipo == 'porcentaje') {
        let tbl = document.getElementById('tableCostosDirectos');
        let row = tbl.insertRow(tbl.rows.length-1);
        for (let i = 0; i < tbl.rows[0].cells.length; i++) {
            if (i == 0) {
                createCell(row.insertCell(i), '', 'tableCostosDirectos', 'delete');
            } else {
                if (i == 1) {
                    createCell(row.insertCell(i), concepto, 'tableCostosDirectos', 'head');
                    
                } else {
                    if (i == tbl.rows[0].cells.length - 1) {
                        createCell(row.insertCell(i), 0, 'tableCostosDirectos', 'total');
                    } else {
                        createCell(row.insertCell(i), i, 'tableCostosDirectos', 'text');
                    } 
                }
                
            }
        }
        $('#porcentajesCDModal').modal('show');    
    }
    $('#costoDirectosModal').modal('hide');  
}

/* Agrega filas a costos directos si es una sumatoria */
const opcionesCDModal = (event) => {
    event.preventDefault();
    const ingresos = document.getElementById('ingresosCD').checked;
    const costos = document.getElementById('costosCD').checked;
    const recostos = document.getElementById('recostosCD').checked;

    let tableCostosDirectos = document.getElementById('tableCostosDirectos');
    let tableIngresos = document.getElementById('ingresos');
    let tableCostos = document.getElementById('tableCostos');
    let tableCostosRecursos = document.getElementById('tableCostosRecursos');


    let rowLength = tableCostosDirectos.rows.length;
    let cellLength = tableCostosDirectos.rows[0].cells.length;
    let total = 0;
    for (let j = 1; j < cellLength - 1; j++) {
        total = 0;
        if (ingresos) {
            total += parseFloat(tableIngresos.rows[numFilas +1].cells[j+1].innerHTML);
        }
        if (costos) {
            total += parseFloat(tableCostos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        if (recostos) {
            total += parseFloat(tableCostosRecursos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        tableCostosDirectos.rows[rowLength - 2].cells[j+1].innerHTML = total;
    }
    $('#opcionesCDModal').modal('hide'); 
}

/* Agrega filas a costos directos si es un porcentaje. */
const porcentajesCDModal = (event) => {
    event.preventDefault();
    const ingresos = document.getElementById('ingresosPCD').checked;
    const costos = document.getElementById('costosPCD').checked;
    const recostos = document.getElementById('recostosPCD').checked;
    const porcentaje = document.getElementById('porcentajeCD').value;

    let tableCostosDirectos = document.getElementById('tableCostosDirectos');
    let tableIngresos = document.getElementById('ingresos');
    let tableCostos = document.getElementById('tableCostos');
    let tableCostosRecursos = document.getElementById('tableCostosRecursos');


    let rowLength = tableCostosDirectos.rows.length;
    let cellLength = tableCostosDirectos.rows[0].cells.length;
    let total = 0;
    for (let j = 1; j < cellLength - 1; j++) {
        total = 0;
        if (ingresos) {
            total += parseFloat(tableIngresos.rows[numFilas +1].cells[j+1].innerHTML);
        }
        if (costos) {
            total += parseFloat(tableCostos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        if (recostos) {
            total += parseFloat(tableCostosRecursos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        tableCostosDirectos.rows[rowLength - 2].cells[j+1].innerHTML = (total*(porcentaje/100));
    }
    $('#porcentajesCDModal').modal('hide'); 
}

/* Agregar fila a gastos administrativos */
const gastosAdm = (event) => {
    event.preventDefault();
    const concepto = document.getElementById('conceptoGastosAdm').value;
    const tipo = document.getElementById('tipoGastoAdm').value;
    if (tipo == 'null') {
        alert('Selecciona Un Tipo');
        return;
    }
    if (tipo == 'campolibre') {
        appendFila('tableGastosAdm', `${concepto}`);
    }
    if (tipo == 'sumatoria') {
        let tbl = document.getElementById('tableGastosAdm');
        let row = tbl.insertRow(tbl.rows.length-1);
        for (let i = 0; i < tbl.rows[0].cells.length; i++) {
            if (i == 0) {
                createCell(row.insertCell(i), '', 'tableGastosAdm', 'delete');
            } else {
                if (i == 1) {
                    createCell(row.insertCell(i), concepto, 'tableGastosAdm', 'head');
                    
                } else {
                    if (i == tbl.rows[0].cells.length - 1) {
                        createCell(row.insertCell(i), 0, 'tableGastosAdm', 'total');
                    } else {
                        createCell(row.insertCell(i), i, 'tableGastosAdm', 'text');
                    } 
                }
                
            }
        }
        $('#sumatGAModal').modal('show');    
    }
    if (tipo == 'porcentaje') {
        let tbl = document.getElementById('tableGastosAdm');
        let row = tbl.insertRow(tbl.rows.length-1);
        for (let i = 0; i < tbl.rows[0].cells.length; i++) {
            if (i == 0) {
                createCell(row.insertCell(i), '', 'tableGastosAdm', 'delete');
            } else {
                if (i == 1) {
                    createCell(row.insertCell(i), concepto, 'tableGastosAdm', 'head');
                    
                } else {
                    if (i == tbl.rows[0].cells.length - 1) {
                        createCell(row.insertCell(i), 0, 'tableGastosAdm', 'total');
                    } else {
                        createCell(row.insertCell(i), i, 'tableGastosAdm', 'text');
                    } 
                }
                
            }
        }
        $('#porcentajesGAModal').modal('show');    
    }
    $('#gastosAdmModal').modal('hide');  
}

/* Agrega fila a gstos administrativos si es sumatoria */
const opcionesGAModal = (event) => {
    event.preventDefault();
    const ingresos = document.getElementById('ingresosGA').checked;
    const costos = document.getElementById('costosGA').checked;
    const recostos = document.getElementById('recostosGA').checked;

    let tableGastosAdm = document.getElementById('tableGastosAdm');
    let tableIngresos = document.getElementById('ingresos');
    let tableCostos = document.getElementById('tableCostos');
    let tableCostosRecursos = document.getElementById('tableCostosRecursos');


    let rowLength = tableGastosAdm.rows.length;
    let cellLength = tableGastosAdm.rows[0].cells.length;
    let total = 0;
    for (let j = 1; j < cellLength - 1; j++) {
        total = 0;
        if (ingresos) {
            total += parseFloat(tableIngresos.rows[numFilas +1].cells[j+1].innerHTML);
        }
        if (costos) {
            total += parseFloat(tableCostos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        if (recostos) {
            total += parseFloat(tableCostosRecursos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        tableGastosAdm.rows[rowLength - 2].cells[j+1].innerHTML = total;
    }
    $('#sumatGAModal').modal('hide'); 
}

/* Agrega fila a gastos administrativos si es porcentaje */
const porcentajesGAModal = (event) => {
      event.preventDefault();
      event.preventDefault();
    const ingresos = document.getElementById('ingresosPGA').checked;
    const costos = document.getElementById('costosPGA').checked;
    const recostos = document.getElementById('recostosPGA').checked;
    const porcentaje = document.getElementById('porcentajeGA').value;

    let tableGastosAdm = document.getElementById('tableGastosAdm');
    let tableIngresos = document.getElementById('ingresos');
    let tableCostos = document.getElementById('tableCostos');
    let tableCostosRecursos = document.getElementById('tableCostosRecursos');


    let rowLength = tableGastosAdm.rows.length;
    let cellLength = tableGastosAdm.rows[0].cells.length;
    let total = 0;
    for (let j = 1; j < cellLength - 1; j++) {
        total = 0;
        if (ingresos) {
            total += parseFloat(tableIngresos.rows[numFilas +1].cells[j+1].innerHTML);
        }
        if (costos) {
            total += parseFloat(tableCostos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        if (recostos) {
            total += parseFloat(tableCostosRecursos.rows[filasRecursos +1].cells[j].innerHTML);
        }
        tableGastosAdm.rows[rowLength - 2].cells[j+1].innerHTML = (total*(porcentaje/100));
    }
    $('#porcentajesGAModal').modal('hide'); 
}

/* Agrega una fila a la tabla recursos, a costos y a costos recursos.  */
const agregarFilaRecursos = (event) => {
    event.preventDefault();
    $('#recursosModal').modal('hide');  
    const rol = document.getElementById('rol').value;
    const costo = document.getElementById('costo').value;
    let tbl = document.getElementById('tableRecursos');
    let row = tbl.insertRow(tbl.rows.length-1);
    for (let i = 0; i < tbl.rows[0].cells.length; i++) {
        if (i == 0) {
            createCell(row.insertCell(i), '', 'tableRecursos', 'delete');
        } else {
            if (i == 1) {
                createCell(row.insertCell(i), rol, 'tableRecursos', 'head');
                
            } else {
                if (i == tbl.rows[0].cells.length - 1) {
                    createCell(row.insertCell(i), `${filasRecursos}${i}`, 'tableRecursos', 'total');
                } else {
                    createCell(row.insertCell(i), i, 'tableRecursos', 'input');
                } 
            }

        }
    }
    llenarTablaCostos(rol, costo);
    agregarCostRec('tableCostosRecursos', rol);
    filasRecursos ++;
}

/* Agrega una fila a la tabla resumen costos recursos */
const agregarCostRec = (tabla, titulo) => {
    let tbl = document.getElementById(`${tabla}`);
    let row = tbl.insertRow(tbl.rows.length-1);
    for (let i = 0; i < tbl.rows[0].cells.length; i++) {
        if (i == 0) {
            createCell(row.insertCell(i), titulo, tabla, 'head');
        } else {
            createCell(row.insertCell(i), 0, tabla, 'text');
        }
    }
}
