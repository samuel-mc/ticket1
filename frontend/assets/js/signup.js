const registro = (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password  = document.getElementById('pass').value;
    let data = { nombre, apellidos, email, password };
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