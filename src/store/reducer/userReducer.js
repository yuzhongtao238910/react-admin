const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      state = {
        ...state,
        username: action.data
      }
      return state
    case "REMOVE_USER":
      state = {
        ...state,
        username: ""
      }
    default:
      return state
  }
}
export default userReducer