import React from 'react';
import { useDispatch } from 'react-redux';
import { borrarRegistro } from '../slices/registrosSlice';
import { borrarRegistrosAPI } from '../services/service';

const Registro = ({ id, cantidad, fecha, alimento, imagen }) => {
    const dispatch = useDispatch();

    const handleClick = async (event) => {
        try {
            const response = await borrarRegistrosAPI(id);
            dispatch(borrarRegistro(id))

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <tr>
            <td>{fecha}</td>
            <td>{alimento?.nombre}</td>
            <td>
                <img src={imagen} />
            </td>
            <td>{cantidad}</td>
            <td>
                <button onClick={handleClick}>BORRAR</button>
            </td>
        </tr>
    );
};

export default Registro;