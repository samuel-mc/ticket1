/* Funcion que envia al back todos los datos de un presupuesto */
const guardarTodo = async (event) => {
    event.preventDefault();
    
    const token = document.cookie.split('=')[1]; // Obtenemos el token guardado en las cookies
    
    let id_presupuesto_front = 'PR' + Date.now(); // Se crea un id para el front
    let concepto, cantidad;
    
    /* Post proyecto */
    const proyecto = document.getElementById('proyecto').value
    let data = {
        id_presupuesto_front,
        proyecto
    }
    const api = new Api(); //Se hace la instancia de la clase api
    await api.hacerFetch('POST', 'presupuesto', data, token); //Se hace el post correspondiente

    /* POST ingresos */
    const tableIngresos = document.getElementById('ingresos');
    for (let i = 1; i < tableIngresos.rows.length - 1; i++) { //Se crea hacen las iteraciones correspondientes para obtener los datos de cada fila
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
        await api.hacerFetch('POST', 'ingresos', data, token);
    }
    /* POST constos directos*/
    const tableCostosDirectos = document.getElementById('tableCostosDirectos');
    for (let i = 1; i < tableCostosDirectos.rows.length - 1; i++) {
        let costosDirPorMes = [];
        concepto = tableCostosDirectos.rows[i].cells[1].innerHTML;
        for (let j = 2; j < tableCostosDirectos.rows[0].cells.length - 1; j++) {
            mes = tableCostosDirectos.rows[0].cells[j].innerHTML;
            if (isNaN(parseFloat(tableCostosDirectos.rows[i].cells[j].innerHTML))) {
                cantidad = parseFloat(tableCostosDirectos.rows[i].cells[j].children[0].value);
            } else {
                cantidad = parseFloat(tableCostosDirectos.rows[i].cells[j].innerHTML);
            }
            let costoDir = {
                'mes': mes,
                'cantidad': cantidad
            }
            costosDirPorMes.push(costoDir);
        }        
        let data = {
            concepto,
            costosDirPorMes,
            id_presupuesto_front
        }
        await api.hacerFetch('POST', 'costos-directos', data, token);
    }
    /* POST GASTOS ADM*/
    const tableGastosAdm = document.getElementById('tableGastosAdm');
    for (let i = 1; i < tableGastosAdm.rows.length - 1; i++) {
        let costosAdmPorMes = []
        concepto = tableGastosAdm.rows[i].cells[1].innerHTML;
        for (let j = 2; j < tableGastosAdm.rows[0].cells.length - 1; j++) {
            mes = tableGastosAdm.rows[0].cells[j].innerHTML;
            if (isNaN(parseFloat(tableGastosAdm.rows[i].cells[j].innerHTML))) {
                cantidad = parseFloat(tableGastosAdm.rows[i].cells[j].children[0].value);
            } else {
                cantidad = parseFloat(tableGastosAdm.rows[i].cells[j].innerHTML);
            }
            let costoAdm = {
                'mes': mes,
                'cantidad': cantidad
            }
            costosAdmPorMes.push(costoAdm);
        }        
        let data = {
            concepto,
            costosAdmPorMes,
            id_presupuesto_front
        }
        await api.hacerFetch('POST', 'costos-adm', data, token);
    }
    /* POST RECURSOS */
    let rol, costo, porcentaje;
    const tableRecursos = document.getElementById('tableRecursos');
    const tableCostos = document.getElementById('tableCostos');
    for (let i = 1; i < tableRecursos.rows.length - 1; i++) {
        let recursosPorMes = []
        rol = tableRecursos.rows[i].cells[1].innerHTML;
        costo = tableCostos.rows[i].cells[1].innerHTML;
        for (let j = 2; j < tableRecursos.rows[0].cells.length - 1; j++) {
            mes = tableRecursos.rows[0].cells[j].innerHTML;
            porcentaje = parseFloat(tableRecursos.rows[i].cells[j].children[0].value);
            let meses = {
                'mes': mes,
                'porcentaje': porcentaje
            }
            recursosPorMes.push(meses);
        }        
        let data = {
            rol,
            costo,
            recursosPorMes,
            id_presupuesto_front
        }
        await api.hacerFetch('POST', 'recursos', data, token);
    }
    window.location.replace("./index.html");
}