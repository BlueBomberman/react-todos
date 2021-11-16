//function that returns a state
const reducer = (state = [], action) => {
  switch (action.type) {
    case "set":
        return [...action.payload];
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((task) => task.id !== action.payload);
    case "toggleReminder":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, reminder: !task.reminder }
          : task
      );
    default:
      return state;
  }
};

export default reducer;