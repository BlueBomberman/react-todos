//fetch tasks
export const fetchTasks = async () => {
  try {
    const res = await fetch("https://blooming-garden-99974.herokuapp.com/tasks");
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchTask = async (id) => {
  try {
    const res = await fetch(`https://blooming-garden-99974.herokuapp.com/tasks/${id}`);
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const res = await fetch("https://blooming-garden-99974.herokuapp.com/tasks/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });

    return await res.json();
  } catch (error) {
    throw error;
  }
};

//Delete Task
export const deleteTask = async (id) => {
  try {
    await fetch(`https://blooming-garden-99974.herokuapp.com/tasks/${id}`, { method: "DELETE" });
  } catch (error) {
    throw error;
  }
};

export const toggleReminder = async (id) => {
  try {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`https://blooming-garden-99974.herokuapp.com/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    return await res.json();
  } catch (error) {
    throw error;
  }
};
