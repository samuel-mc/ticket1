const localhost = 'http://localhost:3030'

const guardarTodo = async (event) => {
    event.preventDefault();
    let id_presupuesto_front = 'PR' + Date.now();
    let concepto, cantidad;
    
    /* Post proyecto */
    const proyecto = document.getElementById('proyecto').value
    let data = {
        id_presupuesto_front,
        proyecto
    }
    await post(`${localhost}/presupuesto`,data);

    /* POST ingresos */
    const tableIngresos = document.getElementById('ingresos');
    for (let i = 1; i < tableIngresos.rows.length - 1; i++) {
        let ingresoPorMes = [];
        concepto = tableIngresos.rows[i].cells[1].innerHTML;
        for (let j = 2; j < tableIngresos.rows[0].cells.length - 1; j++) {
            mes = tableIngresos.rows[0].cells[j].innerHTML;
            cantidad = parseFloat(tableIngresos.rows[i].cells[j].children[0].value);
            let meses = {
                'mes': mes,
                'cantidad': cantidad
            }
            ingresoPorMes.push(meses)
        }        
        let data = {
            concepto,
            ingresoPorMes,
            id_presupuesto_front
        }
        await post(`${localhost}/ingresos`,data);
    }
    /* POST constos directos*/
    const tableCostosDirectos = document.getElementById('tableCostosDirectos');
    for (let i = 1; i < tableCostosDirectos.rows.length - 1; i++) {
        for (let j = 2; j < tableCostosDirectos.rows[0].cells.length - 1; j++) {
            concepto = tableCostosDirectos.rows[i].cells[1].innerHTML;
            mes = tableCostosDirectos.rows[0].cells[j].innerHTML;
            if (isNaN(parseFloat(tableCostosDirectos.rows[i].cells[j].innerHTML))) {
                cantidad = parseFloat(tableCostosDirectos.rows[i].cells[j].children[0].value);
            } else {
                cantidad = parseFloat(tableCostosDirectos.rows[i].cells[j].innerHTML);
            }
            let data = {
                concepto,
                mes,
                cantidad,
                id_presupuesto_front
            }
            await post(`${localhost}/costos-directos`,data);
        }        
    }
    /* POST GASTOS ADM*/
    const tableGastosAdm = document.getElementById('tableGastosAdm');
    for (let i = 1; i < tableGastosAdm.rows.length - 1; i++) {
        for (let j = 2; j < tableGastosAdm.rows[0].cells.length - 1; j++) {
            concepto = tableGastosAdm.rows[i].cells[1].innerHTML;
            mes = tableGastosAdm.rows[0].cells[j].innerHTML;
            if (isNaN(parseFloat(tableGastosAdm.rows[i].cells[j].innerHTML))) {
                cantidad = parseFloat(tableGastosAdm.rows[i].cells[j].children[0].value);
            } else {
                cantidad = parseFloat(tableGastosAdm.rows[i].cells[j].innerHTML);
            }
            let data = {
                concepto,
                mes,
                cantidad,
                id_presupuesto_front
            }
            await post(`${localhost}/costos-adm`,data);
        }        
    }
    /* POST RECURSOS */
    let rol, costo, porcentaje;
    const tableRecursos = document.getElementById('tableRecursos');
    const tableCostos = document.getElementById('tableCostos');
    for (let i = 1; i < tableRecursos.rows.length - 1; i++) {
        for (let j = 2; j < tableRecursos.rows[0].cells.length - 1; j++) {
            rol = tableRecursos.rows[i].cells[1].innerHTML;
            costo = tableCostos.rows[i].cells[j-1].innerHTML;
            mes = tableRecursos.rows[0].cells[j].innerHTML;
            porcentaje = parseFloat(tableRecursos.rows[i].cells[j].children[0].value);
            let data = {
                rol,
                costo,
                mes,
                porcentaje,
                id_presupuesto_front
            }
            await post(`${localhost}/recursos`,data);
        }        
    }
    window.location.replace("./index.html");
}

async function post(url = '', data = {}) {
    try {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    } catch (err) {
        console.log(err);
    }
}