
/***** Url Base *****/
const urlBase = "https://calcount.develotion.com";

/***** Login *****/
export const login = async (usuario, password) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "usuario": usuario,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(`${urlBase}/login.php`, requestOptions);

        if (!response.ok) {
            const result = await response.json();
            const { codigo, mensaje } = result;
            throw new Error(`${mensaje}`);  //Error desconocido
        }

        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}
/***** Login *****/


/***** Registro *****/
export const registro = async (usuario, password, idPais, calorias) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "usuario": usuario,
            "password": password,
            "idPais": idPais,
            "caloriasDiarias": calorias
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(`${urlBase}/usuarios.php`, requestOptions)
        if (!response.ok) {
            const result = await response.json();
            const { codigo, mensaje } = result;
            throw new Error(`${mensaje}`);  //Error desconocido
        }

        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}
/***** Registro *****/

export const ValidoDatosNoVacios = (usuario, password, idPais, calorias) => {
    if (usuario.length === 0 || password.length === 0 || idPais.length === 0 || calorias.length === 0) {
        throw new Error("Todos los campos son requeridos");
    }
}

/***** ObtenerPaisesAPI *****/
export const obtenerPaisesAPI = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var urlencoded = new URLSearchParams();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(`${urlBase}/paises.php`, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log('json', json)
            return json
        })
        .catch(error => console.log('error', error));
}
/***** ObtenerPaisesAPI *****/

/***** AgregarTareasAPI *****/
export const agregarRegistroAPI = (idAlimento, cantidad, fecha) => {
    let idUsuario = localStorage.getItem("userId");
    return fetch(`${urlBase}/registros.php`, {
        method: 'POST',
        body: JSON.stringify({
            idAlimento: idAlimento,
            idUsuario: idUsuario,
            cantidad: cantidad,
            fecha: fecha
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'apikey': localStorage.getItem("apiKey"),
            'iduser': idUsuario
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(datos => {
            if (datos.codigo === 200) {
                const mensaje = `El alimento: ${idAlimento} fue registrado con éxito!`;
                MostrarMensaje(mensaje);
            } else if (datos.codigo === 401) {
                MostrarMensaje(datos.mensaje);
            }
        })
        .catch(Error => {
            MostrarMensaje(Error.message);
        });
}
/***** AgregarTareasAPI *****/

/***** ObtenerAlimentosAPI *****/
export const obtenerAlimentosAPI = () => {
    let idUsuario = localStorage.getItem("userId");//ver si no conviene ponerla global
    return fetch(`${urlBase}/alimentos.php`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'apikey': localStorage.getItem("apiKey"),
            'iduser': idUsuario
        },
    })
        .then(response => response.json())
        .then(json => {
            console.log('json', json)
            return json
        })
}


//Se me ocurre que la podemos usar para mostrar mensajes. Ver donde corresponde ponerla
function MostrarMensaje(mensaje) {
    let element = document.createElement("ion-toast");
    element.message = mensaje;
    element.duration = 4000;
    document.body.appendChild(element);
    return element.present();
}