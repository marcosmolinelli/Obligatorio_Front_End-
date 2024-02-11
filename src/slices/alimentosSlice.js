import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    alimentos: [], //state
    nombres: []
}
//esta es una version que se va a mejorar

const alimentosSlice = createSlice({
    name: "alimentos",
    initialState,
    reducers: {

        // action= {
        //     payload: listaTareasIniciales
        // }

        cargarAlimentos: (state, action) => {
            console.log('action slice', action)
            const alimentosIniciales = action.payload //carga en este caso es las lista de alimentos iniciales
            // return { ...state, alimentos: alimentosIniciales }; //alimentos = alimentosIniciales
            state.alimentos = alimentosIniciales;
        },
        agregarAlimento: (state, action) => {
            const alimentoNuevo = action.payload;
            state.alimentos = [...state.tareas, alimentoNuevo];
        }

    },
});
export const { cargarAlimentos, agregarAlimento } = alimentosSlice.actions;
export default alimentosSlice.reducer;