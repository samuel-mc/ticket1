const host = 'localhost'
const port = 3030

const validarLoginForm = async(event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let data = { email , password };
    const api = new Api();
    try {
        const response = await api.hacerFetch('POST', 'login', data, '');
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
        console.log('error');
    }

}