import React from 'react';
import { useDispatch } from 'react-redux';
import { borrarRegistro } from '../slices/registrosSlice';
import { borrarRegistrosAPI } from '../services/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../styles/registro.module.css'

const Registro = ({ id, cantidad, fecha, alimento, imagen }) => {
    const dispatch = useDispatch();

    const handleClick = async (event) => {
        try {
            const response = await borrarRegistrosAPI(id);
            dispatch(borrarRegistro(id));
            toast.success('Registro eliminado con éxito', {
                autoClose: 2000,
                style: {
                    backgroundColor: '#4CAF50', // Fondo verde 
                    color: '#FFFFFF', // Texto blanco
                },
            });
        } catch (error) {
            toast.error('Hubo un error al intentar eliminar el registro. Inténtalo de nuevo más tarde.', {
                autoClose: 2000,
                style: {
                    backgroundColor: '#FF5252', // Fondo rojo
                    color: '#FFFFFF', // Texto blanco
                },
            });
        }
    }

    // Extrae la unidad de la propiedad 'porcion' del alimento
    const unidad = alimento?.porcion.slice(-1)

    return (
        <tr>
            <td>{fecha}</td>
            <td>{alimento?.nombre}</td>
            <td>
                <img src={imagen} alt={`Imagen de ${alimento?.nombre}`} />
            </td>
            <td>{cantidad} {unidad}</td>
            <td>
                <button onClick={handleClick} className="btn btn-primary" >Borrar</button>
            </td>
        </tr>
    );
};

export default Registro;