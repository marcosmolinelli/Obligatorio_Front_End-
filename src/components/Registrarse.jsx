import React, { useRef, useState, useEffect } from 'react'
import { registro, ValidoDatosNoVacios, obtenerPaisesAPI } from '../services/service'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { cargarPaises } from '../slices/paisesSlice';
import Seleccionable from './Seleccionable'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from '../styles/registrarse.module.css';

const Registrarse = () => {
    /*Constantes para obtener usuario, contraseña, país y calorias ingresados*/
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [pais, setPais] = useState('');
    const [calorias, setCalorias] = useState('');
    const dispatch = useDispatch();


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
            if (response.codigo === 409) {
                toast.error(response.mensaje, {
                    autoClose: 2000,
                    icon: false,
                    style: {
                        backgroundColor: '#FF5252', // Fondo rojo
                        color: '#FFFFFF', // Texto blanco
                    },
                });
                setTimeout(() => {
                    toast.dismiss();
                }, 2000);
            } else {
                // Si la respuesta es exitosa, guardamos credenciales en local storage y navegamos al dashboard
                localStorage.setItem('userId', response.id);
                localStorage.setItem('apiKey', response.apiKey);
                localStorage.setItem('caloriasDiariasPrevistas', response.caloriasDiarias);
                // Redirigir a la página de dashboard
                toast.success('Usuario creado con éxito', {
                    autoClose: 2000,
                    icon: false,
                    onClose: () => {
                        // Redirigir a la página de dashboard después de mostrar el mensaje
                        navigate(`/dashboard`);
                    },
                    style: {
                        backgroundColor: '#4CAF50', // Fondo verde
                        color: '#FFFFFF', // Texto blanco
                    },
                });
            }
        } catch (error) {
            toast.error(error?.message || 'Hubo un error al procesar la solicitud. Inténtalo de nuevo más tarde.', {
                autoClose: 2000,
                icon: false,
                style: {
                    backgroundColor: '#FF5252', // Fondo rojo
                    color: '#FFFFFF', // Texto blanco
                },
            });
            setTimeout(() => {
                toast.dismiss();
            }, 2000);
        }
    }
    const paises = useSelector((state) => {
        return state.paisesSlice.paises;
    });

    const handleSelect = (pais) => {
        setPais(pais);
    }

    const [apiKey, setapiKey] = useState("")
    useEffect(() => {
        // Verificamos si hay datos en el localStorage para saber si hay usuario logueado
        const usuarioEnSesion = localStorage.getItem("apiKey");
        setapiKey(usuarioEnSesion)

        if (usuarioEnSesion) {
            navigate("/");
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style.content}>
                <h3 className={style.title}>Registrarse</h3>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicUsuario">
                        <Form.Label className={style.label}>Usuario: </Form.Label>
                        <Form.Control
                            type="text"
                            name="usuario"
                            value={usuario}
                            onChange={handleChange}
                            className="form-control mt-1"
                            placeholder="Ingrese su usuario" />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className={style.label}>Password: </Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="form-control mt-1"
                            placeholder="Ingrese su contraseña" />
                    </Form.Group>
                    <Seleccionable className={style.label} options={paises} titulo={"Pais: "} handleSelect={handleSelect} />
                    <br />
                    <Form.Group className="mb-3" controlId="formBasicCalorias">
                        <Form.Label className={style.label}>Calorias Diarias: </Form.Label>
                        <Form.Control
                            type="number"
                            name="calorias"
                            value={calorias}
                            onChange={handleChange}
                            className="form-control mt-1"
                            placeholder="Ingrese calorias diarias" />
                    </Form.Group>
                    <br />
                    <Button type="button" onClick={handleClick} disabled={usuario.length === 0 || password.length === 0 || pais.length === 0 || calorias.length === 0} className="btn btn-primary">
                        REGISTRARME
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Registrarse