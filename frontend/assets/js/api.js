/* Clase encarcargada para interactuar con la api */
class Api {

    /* Constructor que al instanciar pone como atributo el link de la api */
    constructor() {
        this.url = 'http://localhost:3030';
    }

    /** Metodo para realizar un fetch, recibe como parametros el metodo necesitado, la ruta requeridad y si es necesario un token y los datos a enviar */
    async hacerFetch (metodo, ruta, data, token) {
        const url = this.url  + '/' + ruta; //Concatenamos la ruta dada como parametro con la url
        let config = {
            method: `${metodo}`,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`             
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }

        metodo == 'POST' || metodo == 'PUT' ? Object.defineProperty(config, 'body', {value: JSON.stringify(data)}) : ''; // Si el metodo put o post removemos 'data' ya que no se necesita.
        token === '' ? delete config.headers.Authorization : ''; // Si no existe token removemos el campo autorizathion.
        const response = await fetch(url, config );
        return response;
    }
}