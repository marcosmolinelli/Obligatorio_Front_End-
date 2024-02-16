
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
            throw new Error(`Error ${codigo}: ${mensaje}`);
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
export const obtenerPaisesAPI = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`${urlBase}/paises.php`, requestOptions);

        if (!response.ok) {
            const result = await response.json();
            const { codigo, mensaje } = result;
            throw new Error(`${mensaje}`);  //  Lanzamos mensaje de error aquí
        }

        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};
/***** ObtenerPaisesAPI *****/

/***** ObtenerAlimentosAPI *****/
export const obtenerAlimentosAPI = async () => {
    let apiKey = localStorage.getItem("apiKey");
    let userId = localStorage.getItem("userId");
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", apiKey);
        myHeaders.append("iduser", userId);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`${urlBase}/alimentos.php`, requestOptions);
        if (!response.ok) {
            const result = await response.json();
            const { codigo, mensaje } = result;
            throw new Error(`${mensaje}`);  //  Lanzamos mensaje de error aquí
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

/***** ValidoDatosNoVaciosAgregarAlimento *****/

export const validoDatosNoVaciosAgregarAlimento = (alimento, cantidad, fecha) => {
    //falta hacer que el usuario solo pueda ingresar la fecha de hoy o maximo el dia anterior
    if (!alimento || !cantidad || !fecha) {
        throw new Error("Todos los campos son obligatorios.");
    }
};


/***** agregarRegistroAPI *****/
export const agregarRegistroAPI = async (idAlimento, cantidad, fecha) => {
    let apiKey = localStorage.getItem("apiKey");
    let userId = localStorage.getItem("userId");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", apiKey);
    myHeaders.append("iduser", userId);

    var raw = JSON.stringify({
        "idAlimento": idAlimento,
        "idUsuario": userId,
        "cantidad": cantidad,
        "fecha": fecha
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${urlBase}/registros.php`, requestOptions)
        if (!response.ok) {
            const result = await response.json();
            const { codigo, mensaje } = result;
            throw new Error(`${mensaje}`);  //  Lanzamos mensaje de error aquí
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}


/***** ObtenerRegistrosAPI *****/
export const obtenerRegistrosAPI = async () => {
    let apiKey = localStorage.getItem("apiKey");
    let userId = localStorage.getItem("userId");
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", apiKey);
        myHeaders.append("iduser", userId);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`${urlBase}/registros.php?idUsuario=${userId}`, requestOptions);
        if (!response.ok) {
            const result = await response.json();
            const { codigo, mensaje } = result;
            throw new Error(`${mensaje}`);  //  Lanzamos mensaje de error aquí
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}


/***** BorrarRegistrosAPI *****/
export const borrarRegistrosAPI = async (idBorrar) => {
    let apiKey = localStorage.getItem("apiKey");
    let userId = localStorage.getItem("userId");
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", apiKey);
        myHeaders.append("iduser", userId);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`${urlBase}/registros.php?idRegistro=${idBorrar}`, requestOptions)
        if (!response.ok) {
            const result = await response.json();
            const { codigo, mensaje } = result;
            throw new Error(`${mensaje}`);  // Lanzamos mensaje de error aquí
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}


//Se me ocurre que la podemos usar para mostrar mensajes. Ver donde corresponde ponerla
function MostrarMensaje(mensaje) {
    let element = document.createElement("ion-toast");
    element.message = mensaje;
    element.duration = 4000;
    document.body.appendChild(element);
    return element.present();
}