import { combineReducers } from 'redux'
import todosReducer from '../todoSlice'
import visibilityFilterReducer from '../visibilityFilterSlice'

export default combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
})
