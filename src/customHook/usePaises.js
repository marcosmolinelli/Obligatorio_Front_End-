import { useSelector } from 'react-redux';

export const usePais = () => {
    const listaPaises = useSelector((state) => state.paisesSlice.paises);

    const devolverPaises = (idPais) => {
        // Filtrar la lista de alimentos para obtener los correspondientes a los IDs proporcionados
        const pais = listaPaises.find(
            pais => pais.id == idPais
        );

        return pais;
    };

    return devolverPaises;
};