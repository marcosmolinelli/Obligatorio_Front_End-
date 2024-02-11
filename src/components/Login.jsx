import React, { useRef, useState, useEffect } from 'react'
import { login } from '../services/service'
import { useNavigate } from
    "react-router-dom";


const Login = () => {

    /*Estilos*/
    const container = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
    }

    const content = {
        paddingLeft: '12%',
        paddingRight: '12%'
    }

    const title = {
        textAlign: 'center',
        marginBottom: '1em',
        fontSize: '24px',
        color: '#00bcd4',
        fontWeight: '800',
    }

    const label = {
        fontSize: '14px',
        fontWeight: '600',
        color: '#00bcd4',
        marginBottom: '10px'
    }

    /*Constantes para obtener usuario y contraseña ingresados*/
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const inputRefUsu = useRef(null);
    const inputRefPass = useRef(null);

    //REVISAR SI SE NECESITA
    // const loguear = async () => {
    //     try {
    //         const sesion = await login(usuario, password);
    //         localStorage.setItem('apiKey', sesion.apiKey);

    //     } catch (error) {
    //         console.log('error', error.message);
    //     }
    // }


    // useEffect(() => {
    //     try {
    //         loguear();

    //     } catch (error) {
    //         console.log('error', error.message);
    //     }
    // }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'usuario') {
            setUsuario(value);
            setErrorMessage(''); // Limpiar el mensaje de error al cambiar el usuario
        } else if (name === 'password') {
            setPassword(value);
            setErrorMessage(''); // Limpiar el mensaje de error al cambiar la contraseña
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const log = await login(usuario, password);

            if (log.codigo === 409) {
                setErrorMessage(log.mensaje) // Usuario y/o contraseña incorrectos
            } else {
                localStorage.setItem('userId', log.id);
                localStorage.setItem('apiKey', log.apiKey);
                // Redirigir a la página de dashboard
                navigate(`/dashboard`);

            }
        } catch (error) {
            setErrorMessage(error?.message || 'Hubo un error al procesar la solicitud. Inténtalo de nuevo más tarde.');
        }
    };

    const handleRegistroClick = () => {
        navigate('/registrarse');
    };

    return (
        <>
            <div style={container}>
                <div style={content}>
                    <h3 style={title}>Login</h3>
                    <label style={label}>Usuario:
                        <input
                            ref={inputRefUsu}
                            type="text"
                            name="usuario"
                            value={usuario}
                            onChange={handleChange}
                            className="form-control mt-1"
                            placeholder="Ingrese su usuario"
                        /></label>
                    <br />
                    <label style={label}>Contraseña:
                        <input
                            ref={inputRefPass}
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="form-control mt-1"
                            placeholder="Ingrese su contraseña"
                        /></label>
                    <br />
                    <button type="submit" onClick={handleSubmit} disabled={usuario.length === 0 || password.length === 0} className="btn btn-primary">
                        INICIAR SESION
                    </button>
                    <br />
                    <p style={{ marginTop: '20px' }}>Si aún no tenés usuario, <span style={{ color: '#00bcd4', cursor: 'pointer' }} onClick={handleRegistroClick}>registrate aquí</span>.</p>
                    {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
                </div>
            </div>

        </>
    )
}

export default Login