const solicitarCambioPass = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    let data = { email };

    const api = new Api();
    try {
        const response = await api.hacerFetch('POST', 'forgot-password', data, '');
        if (response.status === 200) {
            alert(`Se mando un correo a ${email}`);
            window.location.replace("./login.html")
        }  else {
            response.json().then(data => {
              alert(data);
              return;
          });
        }
    } catch (err) {
        console.log(err);
    }
}

const setNuevoPassword = async (event) => {
    event.preventDefault();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');

    const password = document.getElementById('password').value;
    const data = { password };
    
    const api = new Api( );

    const response = await api.hacerFetch('PUT', 'cambiar-password', data, token);

    if (response.status == 200) {
        alert('Contraseña modificada con exito');
        window.location.replace("./login.html");        
    } else {
        response.json().then(data => {
            alert(data);          
            return;
      });
    }
}