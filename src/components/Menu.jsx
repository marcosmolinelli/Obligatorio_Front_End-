import React from "react";
import { useNavigate } from "react-router-dom";
import style from '../styles/menu.module.css';


const Menu = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        // Limpiamos el localStorage
        localStorage.clear();
        // Redirigimos a la página de login
        navigate('/login');
    }
    const nomUsuario = localStorage.getItem('nombreUsuario');

    return (
        <div className={style.header}>
            <h1 className={style.title}>Bienvenido {nomUsuario}</h1>

            <button onClick={handleClick} className={`btn btn-danger ${style.salir}`}>Salir</button>
        </div>

    )

}
export default Menu