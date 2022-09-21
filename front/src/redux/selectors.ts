import {
  TodoItem,
  TodoState,
  VisibilityFilterTypes,
  VISIBILITY_FILTERS,
} from './types'

export const getTodosByVisibilityFilter = (
  todos: TodoState,
  visibilityFilter: VisibilityFilterTypes,
): Array<TodoItem> => {
  const allTodos = todos.todoItems
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter((todo) => todo.isDone)
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter((todo) => !todo.isDone)
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos
  }
}
