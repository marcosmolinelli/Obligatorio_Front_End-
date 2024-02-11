import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useUsuario } from '../customHook/useUsuario';


const Alimento = ({ userId, id, title, completed }) => {

    const dispatch = useDispatch()
    const otro = useUsuario();

    return (
        <div className="alimento">

            {otro(userId)?.name}

            <label className="checkLabel" >
                {title}
            </label>

        </div>
    )
}

export default Alimento