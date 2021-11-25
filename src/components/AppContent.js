import Header from "./Header";
import Footer from "./Footer";
import About from "./about/About";
import Home from "./home/Home";
import RegisterForm from "./form/RegisterForm";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tasksCreators, formCreators } from "../state/index";
import { useEffect, useState } from "react";
import { fetchTasks } from "../utils/api";

const AppContent = () => {
  const [loading, setLoading] = useState(false);

  const showAddTask = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const { setInitTasks } = bindActionCreators(tasksCreators, dispatch);
  const { toggleForm, setVisibilityForm } = bindActionCreators(
    formCreators,
    dispatch
  );

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const tasks = await fetchTasks();
        setInitTasks(tasks);
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

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onAdd={toggleForm}
        showAdd={showAddTask}
      />
      <Routes>
        <Route path="/" exact element={<Home loading={loading} />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppContent;
