const guardarCambios = async (event) => {
    event.preventDefault();
    actualizarNombre();
    actualizarIngresos();
}

const actualizarNombre = async () => {
    const api = new Api(id_presupuesto);
    /** Guardamos si hay cambios en el titulo del proyecto */
    const proyecto = document.getElementById('proyecto').value;
    let data = {
        id_presupuesto,
        proyecto
    }
    try {   
        await api.hacerFetch('PUT', `presupuesto/${id_presupuesto}`, data, token);
    } catch (err) {
        console.log(err);
    }
}

const actualizarIngresos = async () => {
    const api = new Api(id_presupuesto);
    
    /* POST ingresos */
    const tableIngresos = document.getElementById('ingresos');
    for (let i = 1; i < tableIngresos.rows.length - 1; i++) { //Se crea hacen las iteraciones correspondientes para obtener los datos de cada fila
        let ingresoPorMes = [];
        concepto = tableIngresos.rows[i].cells[1].children[0].value;
        console.log(concepto);
        for (let j = 2; j < tableIngresos.rows[0].cells.length - 1; j++) {
            id = parseInt(tableIngresos.rows[i].cells[j].children[1].innerHTML);
            console.log(id);
            mes = tableIngresos.rows[0].cells[j].innerHTML;
            console.log(mes);
            cantidad = parseFloat(tableIngresos.rows[i].cells[j].children[0].value);
            console.log(cantidad);
            let meses = {
                'id': id,
                'mes': mes,
                'cantidad': cantidad
            }
            ingresoPorMes.push(meses)
        }        
        let data = {
            concepto,
            ingresoPorMes,
        }
        try {
            await api.hacerFetch('PUT', `ingresos/${id}`, data, token);
        } catch (err) {
            console.log(err);
        }
    }
}