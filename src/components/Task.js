import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const Task = ({ task, onDelete, onToggle }) => {
  let [day, setDay] = useState(task.day);

  useEffect(() => {
    try {
      const dateDay = new Date(task.day);
      setDay(dateDay.toLocaleString().slice(0,-3));
    } catch (error) {
      console.log(error);
    }
  }, [task]);

  return (
    <div
      className={`task no-select ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          onClick={() => onDelete(task.id)}
          style={{ color: "red", cursor: "pointer" }}
        />
      </h3>
      <p>{day}</p>
    </div>
  );
};

export default Task;
