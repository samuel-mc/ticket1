const token = document.cookie.split('=')[1]; // Obtenemos el token guardado en las cookies

const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);
const id_presupuesto = urlParams.get('id'); //Se obtiene el token del presupuesto dado como query

window.onload = async function() {

    const api = new Api(); //Intancia de la clase api para interactuar con el backend.

    /* Se obtiene el presupuesto de la api */
    const presupuesto = await api.hacerFetch('GET', `presupuesto/${id_presupuesto}`, '', token);
    presupuesto.json().then(data => {
        document.getElementById('proyecto').value = data.proyecto;
    });

    /* Se obtienen los ingresos correspondientes */
    const ingresos = await api.hacerFetch('GET', `ingresos/${id_presupuesto}`, '', token);
    ingresos.json().then(data => {
        const ingresos = document.getElementById('ingresos'); //obtiene la tabla donde pondremos la informacion obtenida
        renderTabla(ingresos, data);
    });

    /* Se obtienen los costos directos */
    const costosDirectos = await api.hacerFetch('GET', `costos-directos/${id_presupuesto}`, '', token);
    costosDirectos.json().then(data => {
        const tableCostosDirectos = document.getElementById('tableCostosDirectos');
        renderTabla(tableCostosDirectos, data);
    });

    /* Se obtienen los costos administrativos */
    const gastosAdm = await api.hacerFetch('GET', `costos-adm/${id_presupuesto}`, '', token);
    gastosAdm.json().then(data => {
        const tableGastosAdm = document.getElementById('tableGastosAdm');
        renderTabla(tableGastosAdm, data);
    });

    /* Se obtienen los recursos */
    const recursos = await api.hacerFetch('GET', `recursos/${id_presupuesto}`, '', token);
    recursos.json().then(data => {
        const tableRecursos = document.getElementById('tableRecursos');
        renderTabla(tableRecursos, data);
        console.log(data);
    })
}

/* Renderizamos una tabla que requiere un boton de eliminar en la primera columna */
const renderTabla = (tabla, data) => {
    renderHead(tabla, data.entradas[0]);
    renderFilas(tabla, data);
}

/* Renderizamos la primera fila de una tabla que requiere boton eliminar */
const renderHead = (tabla, data) => {
    for (let i = 0; i < data.length; i++) {
        createCell(tabla.rows[0].insertCell(tabla.rows[0].cells.length-1), data[i].mes);
        createCell(tabla.rows[tabla.rows.length-1].insertCell(tabla.rows[0].cells.length-1), '0');
    }  
}

/* Renderizamos la filas con el contenido de la tabla */
const renderFilas = (tabla, data) => {
    let fila;
    tabla.id == 'ingresos' ? fila = data.ingresos : '';
    tabla.id == 'tableCostosDirectos' ? fila = data.costosDirectos : '';
    tabla.id == 'tableGastosAdm' ? fila = data.costosAdm : '';
    tabla.id == 'tableRecursos'? fila = data.recursos : '';
    for (let i = 0; i < fila.length; i++) {
        let row = tabla.insertRow(tabla.rows.length - 1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let concepto = document.createElement("input");
        cell1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>`
        cell1.setAttribute('class', 'borrar btn btn-danger')
        cell2.appendChild(concepto);
        tabla.id == 'tableRecursos'? concepto.setAttribute('value', fila[i].rol) : concepto.setAttribute('value', fila[i].concepto);
        
        for (let j = 0; j < data.entradas[0].length; j++) {
            let input = document.createElement("input");
            let span = document.createElement("span");
            let cell = row.insertCell(2 + j);
            tabla.id == 'tableRecursos'? input.setAttribute('value', data.entradas[0][j].porcentaje) : input.setAttribute('value', data.entradas[0][j].cantidad);
            span.innerHTML = data.entradas[0][j].id;
            span.style.display = 'none';
            cell.appendChild(input);
            cell.appendChild(span);
        }
    }
}

/* Se crea cada celda de la table */
function createCell(cell, text) {
    let txt = document.createTextNode(text);
    txt.innerHTML = text;                 
    cell.appendChild(txt); 
}