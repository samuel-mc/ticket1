//tbl.rows[j].cells[i].children[0].value

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let numColumnas = 0; //Controlar el numero de columnas que hay 
let numFilas = 0; //Contador para el numero de filas en ingresos
let filasRecursos = 0;
let mesInicio;

/* Funcon que segun el tipo de necesidad agrega una celda a la tabla */
function createCell(cell, text, tabla, tipo) {
    let div = document.createElement('div');
    let txt = document.createTextNode(text);
    switch (tipo) {
        case 'head':
            txt.innerHTML = text;                 
            cell.appendChild(txt); 
            break;
        case 'text':
            txt.innerHTML = 0;
            cell.appendChild(txt);
            break;
        case 'input':
            let input = document.createElement('input');
            input.setAttribute('type', 'number');
            cell.appendChild(input); 
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
        case 'total':
            txt.innerHTML = 0;
            cell.appendChild(txt);
        default:
          break;
    } 
}

/* Llena los campos en la tabla costos  */
const llenarTablaCostos = (titulo, costo) => {
    const tableCostos = document.getElementById('tableCostos');
    let row = tableCostos.insertRow(tableCostos.rows.length-1);
    for (let i = 0; i < tableCostos.rows[0].cells.length; i++) {
        if (i == 0) {
            createCell(row.insertCell(i), titulo, 'tableCostos', 'head');
        } else {
            if (i == tableCostos.rows[0].cells.length - 1) {
                createCell(row.insertCell(i), costo*numColumnas, 'tableCostos', 'text');
            } else {
                createCell(row.insertCell(i), costo, 'tableCostos', 'text');
            }
        }
    }
    totalFila('tableCostos');
    totalColumna('tableCostos');
}

/* Llena la informacon en la tabla de costos recursos. */
const actualizarCostsRecs = () => {
    let tbl = document.getElementById('tableRecursos');
    let tablaCostos = document.getElementById('tableCostos');
    let tableCostosRecursos = document.getElementById('tableCostosRecursos');
    let total = 0;
    for (let i = 2; i < tbl.rows[0].cells.length-1; i++) {
        total = 0;
        for (let j = 1; j < tbl.rows.length - 1; j++) {
            const porcentaje = tbl.rows[j].cells[i].children[0].value;
            let cantidad = (porcentaje/100)*parseFloat(tablaCostos.rows[j].cells[i-1].innerHTML);
            tableCostosRecursos.rows[j].cells[i-1].innerHTML = cantidad;
            total += cantidad;
        }
    }
    totalFilaPorcentajes('tableRecursos');
    totalColumnaPorcentajes('tableRecursos');
    totalFila('tableCostosRecursos');
    totalColumna('tableCostosRecursos');
}


/* Total columna y actuliza la informacion */
const totalCostosDA = (tabla) => {
    const tbl = document.getElementById(tabla);
    const tableCostosDirectos = document.getElementById('tableCostosDirectos');
    const tableGastosAdm = document.getElementById('tableGastosAdm');
    const tableFlujoEfectivo = document.getElementById('tableFlujoEfectivo');
    let total = 0;
    let cantidad = 0;
    let egresos = 0;
    /* Obtiene el total de cada columna (mues) */
    for (let i = 2; i < tbl.rows[0].cells.length-1; i++) {
        total = 0;
        for (let j = 1; j < tbl.rows.length - 1; j++) {
            if (isNaN(parseFloat(tbl.rows[j].cells[i].innerHTML))) {
                cantidad = parseFloat(tbl.rows[j].cells[i].children[0].value);
            } else {
                cantidad = parseFloat(tbl.rows[j].cells[i].innerHTML);
            }
            total += cantidad;
        }
        tbl.rows[tbl.rows.length - 1].cells[i].innerHTML = total;
        egresos = parseFloat(tableCostosDirectos.rows[tableCostosDirectos.rows.length - 1].cells[i].innerHTML) + parseFloat(tableGastosAdm.rows[tableGastosAdm.rows.length - 1].cells[i].innerHTML);
        tableFlujoEfectivo.rows[2].cells[i-1].innerHTML = egresos;
    }
    /* Obtiene el total de cada fila*/
    for (let i = 1; i < tbl.rows.length; i++) {
        total = 0;
        for (let j = 2; j < tbl.rows[0].cells.length - 1; j++) {
            if (isNaN(parseFloat(tbl.rows[i].cells[j].innerHTML))) {
                cantidad = parseFloat(tbl.rows[i].cells[j].children[0].value);
            } else {
                cantidad = parseFloat(tbl.rows[i].cells[j].innerHTML);
            }
            total += cantidad;
        }
        tbl.rows[i].cells[tbl.rows[0].cells.length - 1].innerHTML = total;
    }
    fillFlujoEfectivo();
    fillEdoResultados();
    totalColumna('tableEdoResultados');
}

/* Llenar Resumen Financiero */
const fillResFinan = () => {
    const tabla = document.getElementById('tableResFinan');
    let tableFlujoEfectivo = document.getElementById('tableFlujoEfectivo'); 
    /* Columna ventas en resumen financiero */
    let ventas = tableFlujoEfectivo.rows[1].cells[tableFlujoEfectivo.rows[0].cells.length-1].innerHTML;
    tabla.rows[1].cells[0].innerHTML = ventas; 
    /* Columna costos en resumen financiero */
    let costos = tableFlujoEfectivo.rows[2].cells[tableFlujoEfectivo.rows[0].cells.length-1].innerHTML;
    tabla.rows[1].cells[1].innerHTML = '$ ' + costos; 
    /* Columna margen en resumen financiero */
    let margen = parseFloat(ventas) - parseFloat(costos)
    tabla.rows[1].cells[2].innerHTML = '$ ' + margen; 
    /* Columna % en resumen financiero */
    let porcent = parseFloat(margen) / parseFloat(ventas);
    tabla.rows[1].cells[3].innerHTML = porcent + '%'; 
}

/* LLenamos la tabla flujo de efectivo */
const fillFlujoEfectivo = () => {
    const tableFlujoEfectivo = document.getElementById('tableFlujoEfectivo');
    let totalFE = 0;
    /* Campo total en flujo de efectivo */
    for (let i = 1; i < tableFlujoEfectivo.rows[0].cells.length-1; i++) {
        totalFE = parseFloat(tableFlujoEfectivo.rows[1].cells[i].innerHTML) - parseFloat(tableFlujoEfectivo.rows[2].cells[i].innerHTML);
        tableFlujoEfectivo.rows[3].cells[i].innerHTML = totalFE;
        if (totalFE < 0) {
            tableFlujoEfectivo.rows[3].cells[i].className = 'negativo';
        } else {
            tableFlujoEfectivo.rows[3].cells[i].className = '';
        }
    }

    /* Campo acumulado */
    let acumulado = 0;
    for (let i = 1; i < tableFlujoEfectivo.rows[0].cells.length-1; i++) {
        if (i === 1) {
            acumulado = parseFloat(tableFlujoEfectivo.rows[3].cells[1].innerHTML);
            if (acumulado < 0) {
                tableFlujoEfectivo.rows[4].cells[i].className = 'negativo';
            } else {
                tableFlujoEfectivo.rows[4].cells[i].className = '';
            }
        } else {
            acumulado = parseFloat(tableFlujoEfectivo.rows[3].cells[i].innerHTML) + parseFloat(tableFlujoEfectivo.rows[4].cells[i-1].innerHTML);
            if (acumulado < 0) {
                tableFlujoEfectivo.rows[4].cells[i].className = 'negativo';
            } else {
                tableFlujoEfectivo.rows[4].cells[i].className = '';
            }
        }
        tableFlujoEfectivo.rows[4].cells[i].innerHTML = acumulado;
    }
    totalColumna('tableFlujoEfectivo');
    fillResFinan();
}

/* Llenamos la tabla estado de resusltados */

const fillEdoResultados = () => {
    const tableEdoResultados = document.getElementById('tableEdoResultados') ;
    const tableCostosDirectos = document.getElementById('tableCostosDirectos');
    const tableGastosAdm = document.getElementById('tableGastosAdm');
    let tablaIngresos = document.getElementById('ingresos');

    /* Ventas */
    let ventas = 0;
    for (let j = 1; j < tableEdoResultados.rows[0].cells.length - 1; j++) {
        ventas = parseFloat(tablaIngresos.rows[tablaIngresos.rows.length - 1].cells[j+1].innerHTML);
        tableEdoResultados.rows[1].cells[j].innerHTML = ventas;
    }
    /* Costos */
    let costos = 0;
    for (let j = 1; j < tableEdoResultados.rows[0].cells.length - 1; j++) {
        costos = parseFloat(tableCostosDirectos.rows[tableCostosDirectos.rows.length - 1].cells[j+1].innerHTML) + parseFloat(tableGastosAdm.rows[tableGastosAdm.rows.length - 1].cells[j+1].innerHTML);
        tableEdoResultados.rows[2].cells[j].innerHTML = costos;
    }
    /* Margen */
    let margens = 0;
    for (let j = 1; j < tableEdoResultados.rows[0].cells.length - 1; j++) {
        margens = parseFloat(tableEdoResultados.rows[1].cells[j].innerHTML) - parseFloat(tableEdoResultados.rows[2].cells[j].innerHTML);
        if (margens < 0) {
            tableEdoResultados.rows[3].cells[j].className = 'negativo';
        } else {
            tableEdoResultados.rows[3].cells[j].className = '';
        }
        tableEdoResultados.rows[3].cells[j].innerHTML = margens;
    }
    /* Saldo Final */
    let saldoFinal = 0;
    for (let j = 1; j < tableEdoResultados.rows[0].cells.length - 1; j++) {
        if (j == 1) {
            saldoFinal = parseFloat(tableEdoResultados.rows[3].cells[j].innerHTML);
        } else {
            saldoFinal = parseFloat(tableEdoResultados.rows[3].cells[j].innerHTML) + parseFloat(tableEdoResultados.rows[4].cells[j - 1].innerHTML);
        }
        tableEdoResultados.rows[4].cells[j].innerHTML = saldoFinal;
    }

}

const cancelar = () => {
    let opcion = confirm("¿Estás seguro?");
    if (opcion) {
        window.location.replace("./index.html");       
    }
}