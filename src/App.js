import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchTasks, deleteTask, addTask, toggleReminder } from "./utils/api";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  //così facendo lo rendiamo parte dello stato del nostro componente
  const [tasks, setTasks] = useState([]);
  /* in realtà dovremmo le context api o redux*/

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksFromServer = await fetchTasks();
        if(tasksFromServer)
          setTasks(tasksFromServer);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []);

  const handleAddTask = async (task) => {
    const data = await addTask(task);
    setTasks([...tasks, data]);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleReminder = async (id) => {
    const data = await toggleReminder(id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const toggleAddForm = () => {
    setShowAddTask((show) => !show);
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={toggleAddForm}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                {showAddTask && <AddTask onAdd={handleAddTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onToggle={handleToggleReminder}
                    onDelete={handleDeleteTask}
                  />
                ) : (
                  "No tasks to show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
