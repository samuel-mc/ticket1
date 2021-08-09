const host = 'localhost'
const port = 3030

const validarLoginForm = async(event) => {
    try {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let data = { email: email, password: password };
        await login(`http://${host}:${port}/login`, data )
    } catch (err) {
        console.log('error');
    }

}


async function login(url = '', data = {}) {
    try {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
           
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        });
        if (response.status === 200) {
            response.json().then(data => {
                document.cookie = `token=${data}`;
            });
            window.location.replace("./index.html");
        } else {
            response.json().then(data => {
                alert(data);
                return;
            });
        }
    } catch (err) {
        console.log(err);
    }
}