import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TodoItem, TodoState } from './types'

const initialState: TodoState = {
  todoItems: [],
}

export const fetchAllTodos = createAsyncThunk<{ todos: TodoItem[] }>(
  'todos/fetchAllTodos',
  async () => {
    const response = await axios.get('http://localhost:8000/api/todo/')
    return { todos: response.data }
  },
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchAllTodosというcreateAsyncThunkが正常終了した場合のReducer
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.todoItems = action.payload.todos // payloadCreatorでreturnされた値
    })
  },
})

export default todoSlice.reducer
