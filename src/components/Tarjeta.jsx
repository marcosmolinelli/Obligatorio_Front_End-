import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Tarjeta = ({ userId, id, nombre, calorias, proteinas, grasas }) => {
    const dispatch = useDispatch();

    // Estado local para el checkbox
    const [isChecked, setIsChecked] = useState(false);

    // Manejador de cambio del checkbox
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        // Aquí puedes realizar cualquier lógica adicional según sea necesario
    };

    return (




        <div className="alimento">
            {/* Muestra el nombre del usuario según el userId */}
            {/* {otro(userId)?.name} */}

            <label className="checkLabel">
                {/* Usa el estado local del checkbox */}
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                {nombre}

            </label>
        </div>
    );
};

export default Tarjeta;
