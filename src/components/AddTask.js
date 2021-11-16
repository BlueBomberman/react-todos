import { useState } from "react";
import { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const AddTask = forwardRef(({ onAdd }, ref) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    if (!text) {
      alert("please add a task");
      return;
    }

    onAdd({ text, day, reminder });

    setText("");
    setDay("");
    setReminder(false);

    e.preventDefault();
  };

  const handleCancelClick = (e) => {
    setText("");
    setDay("");
    setReminder(false);
  };

  const checkbox = (
    <Checkbox
      value={reminder}
      checked={reminder}
      onChange={(e) => {
        setReminder(e.currentTarget.checked);
      }}
    />
  );

  return (
    <form ref={ref} className="add-form" onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <TextField
            className="mb-3 mt-3"
            required
            placeholder="Add Task"
            label="Task"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            className="mb-3"
            placeholder="Add Day & Time"
            label="Day & Time"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <FormGroup className="mb-3">
            <FormControlLabel label="Set Reminder" control={checkbox} />
          </FormGroup>
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Button variant="contained" color="primary" type="submit">
              Save Task
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelClick}
            >
              Cancel Task
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
});

export default AddTask;
