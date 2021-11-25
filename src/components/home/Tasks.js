import Task from "./Task";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import List from "@mui/material/List";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      <List>
        <TransitionGroup>
          {tasks.map((task) => (
            <Collapse key={task.id}>
              <Task task={task} onDelete={onDelete} onToggle={onToggle} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </>
  );
};

export default Tasks;
