import { createSlice } from '@reduxjs/toolkit'
import { VisibilityFilterTypes, VISIBILITY_FILTERS } from '../redux/types'

const initialState: VisibilityFilterTypes = VISIBILITY_FILTERS.ALL

const visibilityFilterSlice = createSlice({
  name: 'visibilityFilter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
})

export const { setFilter } = visibilityFilterSlice.actions
export default visibilityFilterSlice.reducer
