const registro = async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password  = document.getElementById('pass').value;
    let data = { nombre, apellidos, email, password };
    
    const api = new Api('POST', 'usuarios', data);
    const response = await api.hacerFetch();
    console.log(response);
    if(response.status == 201) {
      alert(`Usuario: ${email} agregado con exito`);
      window.location.replace("./login.html")
    } else {
      response.json().then(data => {
        alert(data);
        return;
    });
    }
    
}