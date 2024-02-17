import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        // Limpiamos el localStorage
        localStorage.clear();
        // Redirigimos a la página de login
        navigate('/login');
    }

    return (
        <div className="menu">
            <h1>Dashboard</h1>
            <button onClick={handleClick}>Salir</button>
        </div>

    )

}
export default Menu