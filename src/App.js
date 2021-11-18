import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchTasks, deleteTask, addTask, toggleReminder } from "./utils/api";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Collapse from "@mui/material/Collapse";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tasksCreators, formCreators } from "./state/index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import AppContent from "./components/AppContent";

const customTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#26a69a",
    },
  },
});

const App = () => {
  const tasks = useSelector((state) => state.tasks);
  const showAddTask = useSelector((state) => state.form);

  const dispatch = useDispatch();
  const AC = bindActionCreators(tasksCreators, dispatch);
  const { toggleForm, setVisibilityForm } = bindActionCreators(
    formCreators,
    dispatch
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const tasks = await fetchTasks();
        AC.setInitTasks(tasks);
        document.addEventListener("keydown", handleKeyDown, false);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setVisibilityForm(false);
    }
  };

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
      <ThemeProvider theme={customTheme}>
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
                  <Collapse in={showAddTask}>
                    <AddTask onAdd={handleAddTask} />
                  </Collapse>

                  <AppContent
                    loading={loading}
                    tasks={tasks}
                    handleDeleteTask={handleDeleteTask}
                    handleToggleReminder={handleToggleReminder}
                  />
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
