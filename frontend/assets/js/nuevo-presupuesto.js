const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let numColumnas = 0;
let mesInicio;

function createCell(cell, text) {
    let div = document.createElement('div'); // create DIV element
    let input = document.createElement('input'); // create DIV element
    let txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    cell.appendChild(div);                   // append DIV to the table cell
}

function appendColumna(tabla, titulo) {
    var tbl = document.getElementById(`${tabla}`); // table reference
    for (let i = 0; i < tbl.rows.length; i++) {
        if (i == 0) {
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), titulo);
        } else {
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length-1), `${numColumnas}`);
        }
    }
}

const agregarColumna = (mes) =>{
    appendColumna('tableFlujoEfectivo', mes)
    numColumnas++;
    mesInicio++;
    console.log(mesInicio);
    if (mesInicio == 12) {
        mesInicio = 0;
    }
}

document.getElementById("deleteFlujoEfectivo").addEventListener("click", function(){
    if (numColumnas > 0) {
        let table = document.getElementById('tableFlujoEfectivo'); 
        let row = table.rows;  
        for (let j = 0; j < row.length; j++) {
            row[j].deleteCell(numColumnas);        
        }
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

function agregar() {
    if (numColumnas === 0) {
        const saveFlujoEfectivo = document.getElementById("saveFlujoEfectivo");
        saveFlujoEfectivo.addEventListener('click', function () {
            const mes = document.getElementById("meses").value;
            mesInicio = meses.indexOf(mes);
            agregarColumna(mes);            
            console.log(numColumnas);
            document.getElementById('botonEliminar').setAttribute('data-bs-toggle', 'modal');
            document.getElementById('botonEliminar').setAttribute('data-bs-target', '#modalEliminar');
            document.getElementById('botonAgregar').removeAttribute('data-bs-toggle');
            document.getElementById('botonAgregar').removeAttribute('data-bs-target');
        })            
    } else {
        console.log('fine');
    }
}

const botn = document.getElementById('botonAgregar')
botn.addEventListener("click", function(event){
    if (numColumnas > 0) {
        agregarColumna(meses[mesInicio]); 
    }
});

agregar();