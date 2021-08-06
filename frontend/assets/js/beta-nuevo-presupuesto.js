let columnas = 0;
let indexMes;
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const mainColumnas = () => {
    console.log(columnas);
    if (columnas === 0) {
        const saveFlujoEfectivo = document.getElementById('saveFlujoEfectivo');
        saveFlujoEfectivo.addEventListener('click', function(event) {
            event.preventDefault();
            const mes = document.getElementById('meses').value;
            indexMes = meses.indexOf(mes);
            if (indexMes == 11) {
                indexMes = 0;
            } else {
                indexMes ++;
            }
            removeColumnaTotal();
            addColumna(mes);
            addColumna('Total');
            columnas ++;

            const botonAgregar = document.getElementById('botonAgregar');
            botonAgregar.removeAttribute('data-bs-toggle');
            botonAgregar.removeAttribute('data-bs-target');
        })
    } else {
        removeColumnaTotal();
        addColumna(indexMes);
        addColumna('Total');
        columnas ++;
        if (indexMes == 11) {
            indexMes = 0;
        } else {
            indexMes ++;
        }
    }
}

const addColumna = (head) => {
    const colFlujoEfectivo1 = document.getElementById('colFlujoEfectivo1');
    const td = document.createElement('td');
    td.innerHTML = head
    colFlujoEfectivo1.append(td);
    for (let i = 2; i < 7; i++) {
        const colFlujoEfectivo = document.getElementById(`colFlujoEfectivo${i}`);
        const input = document.createElement('td');
        input.innerHTML = `${i}-${columnas}`   
        colFlujoEfectivo.append(input)   
    }
}

// const addColumna = () => {
//     let table = document.getElementById("tableFlujoEfectivo");
//     for (var i = 0, row; row = table.rows[i]; i++) {
//         console.log(i);
//        //iterate through rows
//        //rows would be accessed using the "row" variable assigned in the for loop
//        for (var j = 0, col; col = row.cells[j]; j++) {
//             row.insertCell(j);
//             console.log(j);
//          //iterate through columns
//          //columns would be accessed using the "col" variable assigned in the for loop
//        }  
//     }
// }

function removeColumnaTotal() {
    let tble = document.getElementById('tableFlujoEfectivo'); 
    let row = tble.rows;  
    for (let j = 0; j < row.length; j++) {
        row[j].deleteCell(columnas+1);        
    }
}

document.getElementById("botonAgregar").addEventListener("click", function(event){
    event.preventDefault();
    addColumna();
});

document.getElementById("botonEliminar").addEventListener("click", function(event){
    event.preventDefault();
    if (columnas > 0) {
        let tble = document.getElementById('tableFlujoEfectivo'); 
        let row = tble.rows;  
        for (let j = 0; j < row.length; j++) {
            row[j].deleteCell(columnas);        
        }
        indexMes --;
        columnas --;
        console.log(columnas);
        if(columnas == 0) {
            const botonAgregar = document.getElementById('botonAgregar');
            botonAgregar.setAttribute('data-bs-toggle', 'modal');
            botonAgregar.setAttribute('data-bs-target', '#exampleModal');
        }
    }
});