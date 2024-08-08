import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  menu: menuReducer,
  user: userReducer,
})
export default reducer
