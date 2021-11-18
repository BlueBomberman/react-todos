import Tasks from "./Tasks";
import CircularProgress from "@mui/material/CircularProgress";

const AppContent = ({loading, tasks, handleToggleReminder, handleDeleteTask}) => {
  return (
    <article>
      {loading ? (
        <section className="w100 d-flex align-items-center justify-content-center my-3">
          <CircularProgress />
        </section>
      ) : tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onToggle={handleToggleReminder}
          onDelete={handleDeleteTask}
        />
      ) : (
        "No tasks to show"
      )}
    </article>
  );
};

export default AppContent;
