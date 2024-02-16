import React, { useRef, useState, useEffect } from 'react'
import { registro, ValidoDatosNoVacios, obtenerPaisesAPI } from '../services/service'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { cargarPaises } from '../slices/paisesSlice';
import Seleccionable from './Seleccionable'

const Registrarse = () => {
    /*Constantes para obtener usuario, contraseña, país y calorias ingresados*/
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [pais, setPais] = useState('');
    const [calorias, setCalorias] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const inputRefUsu = useRef(null);
    const inputRefPass = useRef(null);
    const inputRefCalo = useRef(null);
    const dispatch = useDispatch();

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

    const obtenerPaises = async () => {
        const response = await obtenerPaisesAPI();

        if (response && response.paises) {
            const paises = response.paises; // Extraer el array de países
            dispatch(cargarPaises(paises));
        }
    };

    useEffect(() => {
        obtenerPaises();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'usuario') {
            setUsuario(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'pais') {
            setPais(value);
        } else if (name === 'calorias') {
            setCalorias(value);
        }
    }

    const handleClick = async () => {
        try {
            // Validamos datos antes de la llamada a la API
            ValidoDatosNoVacios(usuario, password, pais, calorias);

            // Llamamos a la API para proceder al registro
            const response = await registro(usuario, password, pais, calorias);
            console.log(response)
            if (response.codigo === 409) {
                setErrorMessage(response.mensaje)
            } else {
                // Si la respuesta es exitosa, guardamos credenciales en local storage y navegamos al dashboard
                localStorage.setItem('userId', response.id);
                localStorage.setItem('apiKey', response.apiKey);
                // Redirigir a la página de dashboard
                navigate(`/dashboard`);

            }
        } catch (error) {
            // Manejar errores locales (validaciones, etc.)
            setErrorMessage(error?.message || 'Hubo un error al procesar la solicitud. Inténtalo de nuevo más tarde.');
        }
    }
    const paises = useSelector((state) => {
        console.log('Estado de Redux - Paises:', state.paisesSlice.paises);
        return state.paisesSlice.paises;
    });

    const handleSelect = (pais) => {
        setPais(pais);
    }

    return (
        <div style={container}>
            <div style={content}>
                <h3 style={title}>Registrarse</h3>
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
                <Seleccionable style={label} options={paises} titulo={"Pais:"} handleSelect={handleSelect} />
                <br />
                <label style={label}>Calorias Diarias:
                    <input
                        ref={inputRefCalo}
                        type="number"
                        name="calorias"
                        value={calorias}
                        onChange={handleChange}
                        className="form-control mt-1"
                        placeholder="Ingrese calorias diarias"
                    /></label>
                <br />
                <button onClick={handleClick} disabled={usuario.length === 0 || password.length === 0 || pais.length === 0 || calorias.length === 0} className="btn btn-primary">
                    REGISTRARME
                </button>
                {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Registrarse