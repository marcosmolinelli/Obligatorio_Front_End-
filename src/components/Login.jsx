import React, { useState, useEffect } from 'react'
import { login } from '../services/service'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import style from '../styles/login.module.css';

const Login = () => {

    /*Constantes para obtener usuario y contraseña ingresados*/
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'usuario') {
            setUsuario(value);
        } else if (name === 'password') {
            setPassword(value);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const log = await login(usuario, password);

            if (log.codigo === 409) {
                toast.error(log.mensaje, {
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
                setUsuario('');
                setPassword('');
            } else {
                localStorage.setItem('userId', log.id);
                localStorage.setItem('apiKey', log.apiKey);
                localStorage.setItem('caloriasDiariasPrevistas', log.caloriasDiarias);
                localStorage.setItem('nombreUsuario', usuario);

                // Redirigir a la página de dashboard
                navigate(`/dashboard`);
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
            setUsuario('');
            setPassword('');
        };
    }

    const handleRegistroClick = () => {
        navigate('/registrarse');
    };
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
        <>
            <div className={style.container}>
                <div className={style.content}>
                    <h3 className={style.title}>Login</h3>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicUsuario">
                            <Form.Label className={style.label}>Usuario</Form.Label>
                            <Form.Control type="text"
                                name="usuario"
                                value={usuario}
                                onChange={handleChange}
                                className="form-control mt-1"
                                placeholder="Ingrese su usuario" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className={style.label}>Password</Form.Label>
                            <Form.Control type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="form-control mt-1"
                                placeholder="Ingrese su contraseña" />
                        </Form.Group>
                        <Button type="button" onClick={handleSubmit} disabled={usuario.length === 0 || password.length === 0} className="btn btn-primary">
                            INICIAR SESION
                        </Button>
                    </Form>
                    <p style={{ marginTop: '20px', color: 'black' }}>Si aún no tenés usuario, <span style={{ color: '#00bcd4', cursor: 'pointer' }} onClick={handleRegistroClick}>registrate aquí</span>.</p>
                </div>
            </div>
        </>
    )
}

export default Login    