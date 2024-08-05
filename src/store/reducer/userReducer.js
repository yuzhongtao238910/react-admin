const userReducer = (state = {}, action) => {
  switch (action.type) {
  case "SET_USER":
      state = {
        username: action.data
      }
      return state
    default:
      return state
  }
}
export default userReducer