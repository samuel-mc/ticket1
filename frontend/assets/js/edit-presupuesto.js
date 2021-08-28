// const editarPresupuesto = (e) => {
    
//     console.log(id_presupuesto)

//     const contenedorIngresos = document.getElementById('contenedorIngresos');
//     const api = new Api();
//     const response = await api.hacerFetch('GET', `ingresos/${id_presupuesto}`, '', token);
//         response.json().then(data => {
//             console.log(data);
//         });
      
// }

window.onload = async function() {
    const token = document.cookie.split('=')[1]; // Obtenemos el token guardado en las cookies

    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    const id_presupuesto = urlParams.get('id'); //Se obtiene el token dado como query

    console.log(id_presupuesto);
    const api = new Api();
    const presupuesto = await api.hacerFetch('GET', `presupuesto/${id_presupuesto}`, '', token);
        presupuesto.json().then(data => {
            console.log(data);
        });
}

