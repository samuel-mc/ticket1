const editarPresupuesto = (e, id_presupuesto) => {
    const contenedorIngresos = document.getElementById('contenedorIngresos');
    const api = new Api();
    const response = await api.hacerFetch('GET', `ingresos/${id_presupuesto}`, '', '');
        response.json().then(data => {
            console.log(data);
        });
      
}
