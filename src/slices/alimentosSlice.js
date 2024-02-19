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
        cargarAlimentos: (state, action) => {
            const alimentosIniciales = action.payload;
            state.alimentos = [...alimentosIniciales];
        },
    },
});
export const { cargarAlimentos, agregarAlimento } = alimentosSlice.actions;
export default alimentosSlice.reducer;