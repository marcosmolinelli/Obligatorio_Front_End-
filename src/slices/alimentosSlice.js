import { createSlice } from "@reduxjs/toolkit";

const initialState = { //estado inicial
    alimentos: [],
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
            const alimentosIniciales = action.payload;
            state.alimentos = [...alimentosIniciales];
        },

        // agregarAlimento: (state, action) => {
        //     const alimentoNuevo = action.payload;
        //     state.alimentos = [...state.alimentos, alimentoNuevo];
        // }

    },
});
export const { cargarAlimentos, agregarAlimento } = alimentosSlice.actions;
export default alimentosSlice.reducer;