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
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
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