import Tasks from "./Tasks";
import CircularProgress from "@mui/material/CircularProgress";

const AppContent = ({
  loading,
  tasks,
  handleToggleReminder,
  handleDeleteTask,
}) => {
  return (
    <article className="w100">
      {loading ? (
        <section className="w100 d-flex align-items-center justify-content-center my-3">
          <CircularProgress />
        </section>
      ) : tasks.length > 0 ? (
        <section>
          <Tasks
            tasks={tasks}
            onToggle={handleToggleReminder}
            onDelete={handleDeleteTask}
          />
          <div className="w100 d-flex justify-content-center">
            <small style={{ fontSize: "12px", fontWeight: "350" }}>
              doubleclick a task to toggle the reminder
            </small>
          </div>
        </section>
      ) : (
        "No tasks to show"
      )}
    </article>
  );
};

export default AppContent;
