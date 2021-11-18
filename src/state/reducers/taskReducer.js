//function that returns a state
const reducer = (state = [], action) => {
  switch (action.type) {
    case "set_tasks":
        return [...action.payload];
    case "add_task":
      return [...state, action.payload];
    case "delete_task":
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