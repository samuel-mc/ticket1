const solicitarCambioPass = async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    try {
        let data = { email };
        fetchPass(data);
        alert(`Se mando un correo a ${email}`);
        window.location.replace("./login.html")
    } catch (err) {
        console.log(err);
    }
}

async function fetchPass(data = {}) {
    try {
        const response = await fetch('http://localhost:3030/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
           
          },
          body: JSON.stringify(data)
        });
    } catch (err) {
        console.log(err);
    }
}

const setNuevoPassword = (event) => {
    event.preventDefault();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');

    const password = document.getElementById('password').value;
    const data = { password };
    fetchCambioPass(data, token);
    alert('Contraseña modificada con exito');
    window.location.replace("./login.html");
}

async function fetchCambioPass(data = {}, token) {
    try {
        const response = await fetch('http://localhost:3030/cambiar-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           
          },
          body: JSON.stringify(data)
        });
    } catch (err) {
        console.log(err);
    }
}