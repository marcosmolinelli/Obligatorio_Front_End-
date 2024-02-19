import { useSelector } from 'react-redux';

export const useAlimentoGrafica = () => {
    const listaAlimentos = useSelector((state) => state.alimentosSlice.alimentos);

    const devolverAlimentos = (idAlimento) => {
        const alimento = listaAlimentos.find(
            alimentos => alimentos.id == idAlimento
        )
        return alimento;
    }

    return devolverAlimentos;
};