let columnas = 0;

const addColumna = () => {
    const colFlujoEfectivo1 = document.getElementById('colFlujoEfectivo1');
    const td = document.createElement('td');
    td.innerHTML = "Mes"
    colFlujoEfectivo1.append(td);
    for (let i = 2; i < 7; i++) {
        const colFlujoEfectivo = document.getElementById(`colFlujoEfectivo${i}`);
        const td = document.createElement('td');
        td.innerHTML = `${i}-${columnas}`   
        colFlujoEfectivo.append(td)   
    }
    columnas ++;
}

const addColumnaTotal = () => {
    const colFlujoEfectivo1 = document.getElementById('colFlujoEfectivo1');
    const td = document.createElement('td');
    td.innerHTML = "Total"
    colFlujoEfectivo1.append(td);
    for (let i = 2; i < 7; i++) {
        const colFlujoEfectivo = document.getElementById(`colFlujoEfectivo${i}`);
        const td = document.createElement('td');
        td.innerHTML = `${i}-${columnas}`   
        colFlujoEfectivo.append(td)   
    }
}

function removeColumnaTotal() {
    var tble = document.getElementById('tableFlujoEfectivo'); 
    var row = tble.rows;  
    var i = 1; 
    for (var j = 0; j < row.length; j++) {
        row[j].deleteCell(columnas+1);        
    }
}

document.getElementById("botonAgregar").addEventListener("click", function(event){
    event.preventDefault();
    if (columnas == 0) {
        
    }
    removeColumnaTotal();
    addColumna();
    addColumnaTotal();
});