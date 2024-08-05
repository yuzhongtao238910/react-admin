const menuReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_TREE_DATA":
      return {
        ...state,
        tree: action.data
      }
    default:
      return state
  }
}
export default menuReducer