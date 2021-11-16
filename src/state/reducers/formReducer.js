//function that returns a state
const reducer = (state = false, action) => {
    switch (action.type) {
      case "toggle":
          return !state;
      default:
        return state;
    }
  };
  
  export default reducer;