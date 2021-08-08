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
            div.appendChild(txt);
            cell.appendChild(div);
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


/* Total columna*/
const totalCostosDA = () => {
    const tableCostosDirectos = document.getElementById('tableCostosDirectos');
    let total = 0;
    for (let i = 2; i < tableCostosDirectos.rows[0].cells.length-1; i++) {
        total = 0;
        for (let j = 1; j < tableCostosDirectos.rows[0].length - 1; j++) {
            let cantidad = parseFloat(tableCostosDirectos.rows[j].cells[i].children[0].value);
            console.log(cantidad);
            total += cantidad;
        }
        tableCostosDirectos.rows[tableCostosDirectos.rows.length - 1].cells[i].innerHTML = total;
    }
    
}