import { useSelector } from 'react-redux';

export const useAlimento = () => {
    const listaAlimentos = useSelector((state) => state.alimentosSlice.alimentos);
  
    const devolverAlimentos = (idsAlimentos) => {
      // Filtrar la lista de alimentos para obtener los correspondientes a los IDs proporcionados
      const alimentos = idsAlimentos.map((idAlimento) =>
        listaAlimentos.find((alimento) => alimento.id === idAlimento)
      );
  
      return alimentos;
    };
  
    return devolverAlimentos;
  };