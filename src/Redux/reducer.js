export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  CLEAR_USER: "CLEAR_USER",
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
