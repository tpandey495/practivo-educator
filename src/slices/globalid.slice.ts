import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: { id: string } = { id: "" }

export const globalId = createSlice({
    name: 'globalId',
    initialState,
    reducers: {
        setGlobalId: (state, action: PayloadAction<{ id: string }>) => {
            state.id = action.payload.id;
        },

    },
})

// Action creators are generated for each case reducer function
export const { setGlobalId } = globalId.actions

export default globalId.reducer