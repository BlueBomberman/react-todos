//function that returns a state
const reducer = (state = false, action) => {
    switch (action.type) {
      case "toggle":
          return !state;
      case "set_form":
          return action.payload;
      default:
        return state;
    }
  };
  
  export default reducer;