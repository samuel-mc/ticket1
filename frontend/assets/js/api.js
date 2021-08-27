class Api {
    constructor(metodo, ruta, data) {
        this.url = 'http://localhost:3030';

    }

    async hacerFetch (metodo, ruta, data, token) {
        const url = this.url  + '/' + ruta;
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

        metodo == 'POST' || metodo == 'PUT' ? Object.defineProperty(config, 'body', {value: JSON.stringify(data)}) : '';
        token === '' ? delete config.headers.Authorization : '';
        const response = await fetch(url, config );
        return response;
    }
}