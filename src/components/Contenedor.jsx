import { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import cargarAlimentos from "./Dashboard";
import { obtenerAlimentosAPI } from "../services/service";
import { useDispatch } from 'react-redux'
import Alimentos from "./Alimentos";


const Contenedor = () => {
    const [alimentos, setAlimentos] = useState([]);
    const dispatch = useDispatch();

    const obtenerAlimentos = async () => {
        const alimentosAPI = await obtenerAlimentosAPI();
        console.log('alimentosAPI', alimentosAPI)
        // setTareas(tareasAPI);

        dispatch(cargarAlimentos(alimentosAPI));

    }

    useEffect(() => {
        obtenerAlimentos();
    }, [])

    const [paises, setPaises] = useState([
        { id: 1, nombre: "Uruguay" },
        { id: 2, nombre: "Brasil" },
        { id: 3, nombre: "Argentina" }
    ]);

    // Verificamos si hay datos en el localStorage para saber si hay usuario logueado
    const usuarioEnSesion = localStorage.getItem("apiKey");

    return (
        <div className="contenedor">
            {/* Renderizamos Login o Dashboard condicionalmente */}
            {usuarioEnSesion ? <Dashboard /> : <Login />}
            <Alimentos alimentos={alimentos}></Alimentos>

        </div>
    )

}

export default Contenedor