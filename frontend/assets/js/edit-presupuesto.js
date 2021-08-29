window.onload = async function() {
    const token = document.cookie.split('=')[1]; // Obtenemos el token guardado en las cookies

    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    const id_presupuesto = urlParams.get('id'); //Se obtiene el token dado como query

    const api = new Api();
    const presupuesto = await api.hacerFetch('GET', `presupuesto/${id_presupuesto}`, '', token);
    presupuesto.json().then(data => {
        console.log(data);
    });
    const ingresos = await api.hacerFetch('GET', `ingresos/${id_presupuesto}`, '', token);
    ingresos.json().then(data => {
        renderIngresos(data);
        console.log(data);
    });
}

const renderIngresos = (data) => {
    const ingresos = document.getElementById('ingresos');
    renderHead(ingresos, data.entradas[0]);
    renderFila(ingresos, data)
}



const renderHead = (tabla, data) => {
    for (let i = 0; i < data.length; i++) {
        createCell(tabla.rows[0].insertCell(tabla.rows[0].cells.length-1), data[i].mes);
        createCell(tabla.rows[tabla.rows.length-1].insertCell(tabla.rows[0].cells.length-1), '0');
    }  
}

const renderFila = (tabla, data) => {
    console.log(data.entradas[0]);
    for (let i = 0; i < data.ingresos.length; i++) {
        let row = tabla.insertRow(tabla.rows.length - 1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>`
        cell1.setAttribute('class', 'borrar btn btn-danger')
        cell2.innerHTML = data.ingresos[i].concepto;
        
        for (let j = 0; j < data.entradas[0].length; j++) {
            let input = document.createElement("input");
            let cell = row.insertCell(2 + j)
            input.setAttribute('value', data.entradas[0][j].cantidad);
            cell.appendChild(input);
            // cell.innerHTML = data.entradas[0][j].cantidad;
        }
    }
    console.log(tabla.rows[0].cells.length);
}

function createCell(cell, text) {
    let txt = document.createTextNode(text);
    txt.innerHTML = text;                 
    cell.appendChild(txt); 
}