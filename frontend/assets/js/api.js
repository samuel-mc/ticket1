class Api {
    constructor(metodo, ruta, data) {
        this.url = 'http://localhost:3030';
        this.metodo = metodo;
        this.ruta = ruta;
        this.data = data;
        this.token = ''
    }

    async hacerFetch () {
        const url = this.url  + '/' + this.ruta;
        let config = {
            method: `${this.metodo}`,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'             
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }

        this.metodo == 'POST' || this.metodo == 'PUT' ? Object.defineProperty(config, 'body', {value: JSON.stringify(this.data)}) : '';
        this.token != '' ? Object.defineProperty(config.headers, 'Authorization', {value: `Bearer ${this.token}`}) : '';
        console.log(config);
        const response = await fetch(url, config );
        return response;
    }
}