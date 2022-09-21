import store from './store'

export type TodoItem = {
  id: number
  title: string
  isDone: number
}

export type TodoState = {
  todoItems: Array<TodoItem>
}

export const VISIBILITY_FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
} as const

export type VisibilityFilterTypes =
  typeof VISIBILITY_FILTERS[keyof typeof VISIBILITY_FILTERS]

export type AppDispatch = typeof store.dispatch
export interface RootState {
  visibilityFilter: VisibilityFilterTypes
  todos: TodoState
}
