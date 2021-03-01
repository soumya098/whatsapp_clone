import { actionTypes } from "./reducer";

export const storeUserData = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_USER,
    payload: data,
  });
};

export const clearData = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_USER,
  });
};
