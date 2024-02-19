import { configureStore } from '@reduxjs/toolkit'

import paisesSlice from '../slices/paisesSlice'
import alimentosSlice from '../slices/alimentosSlice'
import registrosSlice from '../slices/registrosSlice'
import usuariosPorPaisesSlice from '../slices/usuariosPorPaisesSlice'



export const store = configureStore({
    reducer: {
        paisesSlice, alimentosSlice, registrosSlice, usuariosPorPaisesSlice
    },
})