const editarPresupuesto = (e, id_presupuesto) => {
    const contenedorIngresos = document.getElementById('contenedorIngresos');
    const api = new Api('GET', `ingresos/${id_presupuesto}`, '');
    const response = await api.hacerFetch()
        response.json().then(data => {
            console.log(data);
        });
      
}
