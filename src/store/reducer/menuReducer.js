const initialState = {
  tree: [],
  flat: [],
}
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TREE_DATA':
      return {
        ...state,
        tree: action.data,
      }
    case 'SET_FLAT_DATA':
      return {
        ...state,
        flat: action.data,
      }

    case 'REMOVE_TREE_DATA':
      return {
        ...state,
        tree: [],
      }
    case 'REMOVE_FLAT_DATA':
      return {
        ...state,
        flat: [],
      }
    default:
      return state
  }
}
export default menuReducer
