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
      <div className="w100 d-flex justify-content-center">
        <small style={{ fontSize: '12px', fontWeight: '350'}}>doubleclick a task to set reminder</small>
      </div>
    </>
  );
};

export default Tasks;
