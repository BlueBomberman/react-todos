export const setInitTasks = (tasks) => {
  return (dispatch) => {
    dispatch({type: "set", payload: tasks })
  }
}

export const addTask = (task) => {
  return (dispatch) => {
    dispatch({ type: "add", payload: task });
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    dispatch({ type: "delete", payload: taskId });
  };
};

export const toggleReminder = (taskId) => {
  return (dispatch) => {
    dispatch({ type: "toggleReminder", payload: taskId });
  };
};
