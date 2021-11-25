import Collapse from "@mui/material/Collapse";
import HomeContent from "./HomeContent";
import AddTask from "./AddTask";
import { addTask, deleteTask, toggleReminder } from "../../utils/api";

import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { tasksCreators } from "../../state/index";

const Home = ({ loading }) => {
  const tasks = useSelector((state) => state.tasks);
  const showAddTask = useSelector((state) => state.form);

  const dispatch = useDispatch();
  const AC = bindActionCreators(tasksCreators, dispatch);

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

  return (
    <div>
      <Collapse in={showAddTask}>
        <AddTask onAdd={handleAddTask} />
      </Collapse>

      <HomeContent
        loading={loading}
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleToggleReminder={handleToggleReminder}
      />
    </div>
  );
};

export default Home;
