import React, { useRef } from 'react'
import { agregarRegistroAPI } from '../services/service'
import { useDispatch } from 'react-redux'
import { agregarTarea } from '../slices/tareasSlice'

const Agregar = () => {
    const refInput = useRef(null)
    const dispatch = useDispatch();

    const handleClick = async (event) => {
        const title = refInput.current.value;
        try {
            const response = await agregarRegistroAPI();
            console.log('response', response);
            const idRegistro = response.idRegistro;
            const nuevoRegistro = {
                id: idRegistro,
                title: title,
                completed: false
            }
            dispatch(agregarTarea(nuevatarea))


            //agregarTarea(title, response.id);
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <div className="agregar">
            <label >Agregar:
                <input ref={refInput} style={{ width: '200px' }} type="text" name="txtAgregar" />
            </label>
            <input type="button" value="Agregar" onClick={handleClick} />
        </div>
    )
}

export default Agregar