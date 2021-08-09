const registro = (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('usuario').value;
    const password  = document.getElementById('pass').value;
    let data = { nombre, apellidos, email, username, password };
    fetchSignup(data);
    alert(`Usuario: ${email} agregado con exito`);
    window.location.replace("./login.html")
    
}

async function fetchSignup(data = {}) {
    try {
        const response = await fetch('http://localhost:3030/usuarios', {
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

const cambioPass = async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password  = document.getElementById('pass').value;
    try {
        let data = { email, password };
        fetchPass(data);
        alert(`Password de ${email} cambiado con exito`);
        window.location.replace("./login.html")
    } catch (err) {
        console.log(err);
    }
}

async function fetchPass(data = {}) {
    try {
        const response = await fetch('http://localhost:3030/password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
           
          },
          body: JSON.stringify(data)
        });
    } catch (err) {
        console.log(err);
    }
}