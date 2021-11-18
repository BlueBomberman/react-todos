export const toggleForm = () => {
  return (dispatch) => {
    dispatch({ type: "toggle" });
  };
};

export const setVisibilityForm = (val) => {
  return (dispatch) => {
    dispatch({ type: "set_form", payload: val });
  };
};
