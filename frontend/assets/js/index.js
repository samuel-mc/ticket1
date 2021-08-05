window.onload = function() {
    let token = getToken();
    if (token){
        console.log(token);
    } else {
        alert('Necesitas iniciar sesión!');
        window.location.replace("./login.html");
    }
}

const getToken = () => {
    let cookies = document.cookie;
    cookies = cookies.slice(cookies.indexOf('=') + 1,cookies.length);
    return cookies;
    // return cookies.indexOf('=')
}