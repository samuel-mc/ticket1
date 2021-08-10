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

const tablaPresupuestos = async () => {
    const contPresupuestos = document.getElementById('contPresupuestos')
    fetch('http://localhost:3030/presupuesto')
        .then(response => response.json())
        .then(data => {
            data.forEach(presupuesto => {
                const tr = document.createElement('tr');
                const tdDelete = document.createElement('td');
                const trashButton = document.createElement('button');
                trashButton.className = 'btn indexBtn btn-danger btn-sm';
                trashButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path></svg>';
                trashButton.addEventListener('click', e => { removePresupuesto(e, presupuesto.id_presupuestoBis) })
                tdDelete.appendChild(trashButton);
                tr.appendChild(tdDelete);
                const tdID = document.createElement('td');                
                tdID.innerHTML = presupuesto.id_presupuestoBis;
                tr.appendChild(tdID);
                const tdCreated = document.createElement('td');
                tdCreated.innerHTML = presupuesto.createdAt.slice(0,10);
                tr.appendChild(tdCreated);
                const tdProyecto = document.createElement('td');
                tdProyecto.innerHTML = presupuesto.proyecto;
                tr.appendChild(tdProyecto);
                const tdVersion = document.createElement('td');
                tdVersion.innerHTML = presupuesto.version;
                tr.appendChild(tdVersion);
                const tdEdit = document.createElement('td');
                const editBtn = document.createElement('button');
                editBtn.className = 'btn indexBtn btn-secondary btn-sm';
                editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 01-.699.409l-5.523 1.68a.75.75 0 01-.935-.935l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963l2.787-2.786zm-2.275 4.371l-10.28 9.813a.25.25 0 00-.067.108l-1.264 4.154 4.177-1.271a.25.25 0 00.1-.059l10.273-9.806-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5 19 8.44z"></path></svg>';
                tdEdit.appendChild(editBtn);
                tr.appendChild(tdEdit);
                const tdSend = document.createElement('td');
                const sendBtn = document.createElement('button');
                sendBtn.className = 'btn indexBtn btn-primary btn-sm';
                sendBtn.innerHTML = '<svg xmlns="<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.146 1.146 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.374 1.374 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5H3.888z"></path></svg>';
                sendBtn.addEventListener('click', e => { enviarPresupuesto(e, presupuesto.id_presupuestoBis) })
                tdSend.appendChild(sendBtn);
                tr.appendChild(tdSend);
                contPresupuestos.appendChild(tr);
            });
        });
}

const removePresupuesto = async (e, id_presupuesto) => {
    e.preventDefault();
    let opcion = confirm("¿Estás seguro?");
    if (opcion) {
        try {
            await fetch(`http://localhost:3030/presupuesto/${id_presupuesto} `, {
                method: 'DELETE', 
                headers: {
                'Content-Type': 'application/json'
                },
                "Access-Control-Allow-Origin": "*",
                // "Content-Type": "application/json"
            });
        } catch (err) {
            console.log(err);
        }
        alert("Presupuesto eliminado exitosamente.")
        window.location.replace("./index.html"); 
    }
}

const enviarPresupuesto = (e, id_presupuesto) => {
    let opcion = confirm("¿Estás seguro?");
    if (opcion) {
        alert(`Presupuesto: ${id_presupuesto} enviado correctamente`)
        window.location.replace("./index.html"); 
    }     
}

const logout = (event) => {
    event.preventDefault();
    document.cookie = "token=; max-age=1";
    window.location.replace("./login.html"); 
}

tablaPresupuestos();