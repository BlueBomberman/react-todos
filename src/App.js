import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchTasks, deleteTask, addTask, toggleReminder } from "./utils/api";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import About from "./components/About";
import Fade from "@mui/material/Fade";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tasksCreators, formCreators } from "./state/index";

const App = () => {
  const tasks = useSelector((state) => state.tasks);
  const showAddTask = useSelector((state) => state.form);

  const dispatch = useDispatch();
  const AC = bindActionCreators(tasksCreators, dispatch);
  const { toggleForm } = bindActionCreators(formCreators, dispatch);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTasks();
        AC.setInitTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddTask = async (task) => {
    try {
      const data = await addTask(task);
      AC.addTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      AC.deleteTask(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleReminder = async (id) => {
    try {
      await toggleReminder(id);
      AC.toggleReminder(id);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAddForm = () => {
    toggleForm();
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
                {showAddTask && (
                  <Fade in={showAddTask}>
                    <AddTask onAdd={handleAddTask} />
                  </Fade>
                )}

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
