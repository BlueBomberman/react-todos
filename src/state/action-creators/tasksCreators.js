export const setInitTasks = (tasks) => {
  return (dispatch) => {
    dispatch({type: "set_tasks", payload: tasks })
  }
}

export const addTask = (task) => {
  return (dispatch) => {
    dispatch({ type: "add_task", payload: task });
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    dispatch({ type: "delete_task", payload: taskId });
  };
};

export const toggleReminder = (taskId) => {
  return (dispatch) => {
    dispatch({ type: "toggleReminder", payload: taskId });
  };
};
