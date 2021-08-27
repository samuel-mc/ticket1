/* Suma el total de cada columna (mes) */
const totalColumna = (tabla) => {
    let tbl = document.getElementById(`${tabla}`);
    let total = 0;
    for (let i = 1; i < tbl.rows.length; i++) {
        total = 0;
        for (let j = 1; j < tbl.rows[0].cells.length - 1; j++) {
            total += parseFloat(tbl.rows[i].cells[j].innerHTML);
        }
        tbl.rows[i].cells[tbl.rows[0].cells.length - 1].innerHTML = total;
    }
}

/* Suma el total de cada fila (recursos) */
const totalFila = (tabla) => {
    let tbl = document.getElementById(`${tabla}`);
    let total = 0;
    for (let i = 1; i < tbl.rows[0].cells.length; i++) {
        total = 0;
        for (let j = 1; j < tbl.rows.length - 1; j++) {
            total += parseFloat(tbl.rows[j].cells[i].innerHTML);
        }
        tbl.rows[tbl.rows.length-1].cells[i].innerHTML = total;
    }
}

/* Obtiene el total de las fila en tabla donde hay porcentajes */
const totalFilaPorcentajes = (tabla) => {
    const tbl = document.getElementById(`${tabla}`);
    for (let i = 1; i < tbl.rows.length - 1; i++) {
        total = 0;
        for (let j = 2; j < tbl.rows[0].cells.length - 1; j++) {
            const porcentaje = tbl.rows[i].cells[j].children[0].value
            total += parseFloat(porcentaje);
        }
        tbl.rows[i].cells[tbl.rows[0].cells.length - 1].innerHTML = total/(tbl.rows[0].cells.length - 3) + '%';
    }
}

/* Obtiene el total de las columas en tabla donde hay porcentajes */
const totalColumnaPorcentajes = (tabla) => {
    let tbl = document.getElementById(`${tabla}`);
    let total = 0;
    let porcentaje;
    for (let i = 2; i < tbl.rows[0].cells.length - 1; i++) {
        total = 0;
        for (let j = 1; j < tbl.rows.length - 1; j++) {
            porcentaje = tbl.rows[j].cells[i].children[0].value;
            total += parseFloat(porcentaje);
        }
        tbl.rows[tbl.rows.length - 1].cells[i].innerHTML = total/(tbl.rows.length - 2);
    }
}

/* Actualiza los campos en la tabla ingresos. */
const actualizarIngresos = () => {
    let tablaIngresos = document.getElementById('ingresos');
    let tableFlujoEfectivo = document.getElementById('tableFlujoEfectivo');
    let ingreso;
    let totalIngresos = 0;
    /* Obtener el total por columna */
    for (let i = 2; i < tablaIngresos.rows[0].cells.length-1; i++) {
        totalIngresos = 0;
        for (let j = 1; j < tablaIngresos.rows.length - 1; j++) {
            ingreso = tablaIngresos.rows[j].cells[i].children[0].value
            totalIngresos += parseFloat(ingreso);
        }
        tablaIngresos.rows[tablaIngresos.rows.length - 1].cells[i].innerHTML = totalIngresos;
        tableFlujoEfectivo.rows[1].cells[i-1].innerHTML = totalIngresos;
    }
    /* Obtener el total por fila, actualiza el valor  */
    for (let j = 1; j < tablaIngresos.rows.length - 1; j++) {
        totalIngresos = 0;
        for (let i = 2; i < tablaIngresos.rows[0].cells.length-1; i++) {
            ingreso = tablaIngresos.rows[j].cells[i].children[0].value
            totalIngresos += parseFloat(ingreso);
        }
        tablaIngresos.rows[j].cells[tablaIngresos.rows[0].cells.length-1].innerHTML = totalIngresos;
    }
    totalColumna('tableEdoResultados');
    fillResFinan();
    fillFlujoEfectivo();
    fillEdoResultados();
}
