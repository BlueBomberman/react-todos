import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchTasks, deleteTask, addTask, toggleReminder } from "./utils/api";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import About from "./components/About";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

const App = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const AC = bindActionCreators(actionCreators, dispatch);

  const [showAddTask, setShowAddTask] = useState(false);
  const [mounted, setMounted] = useState(false); //c'è sicuramente un modo più elegante

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await fetchTasks();
        AC.setInitTasks(tasks);
        setMounted(true);
      } catch (error) {
        console.log(error);
      }
    };

    if(!mounted) getTasks();
  }, [mounted, AC]);

  const handleAddTask = async (task) => {
    const data = await addTask(task);
    AC.addTask(data);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    AC.deleteTask(id);
  };

  const handleToggleReminder = async (id) => {
    await toggleReminder(id);
    AC.toggleReminder(id);
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
