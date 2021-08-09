const editarPresupuesto = (e, id_presupuesto) => {
    const contenedorIngresos = document.getElementById('contenedorIngresos');
    fetch(`http://localhost:3030/ingresos/${id_presupuesto}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
      
}
