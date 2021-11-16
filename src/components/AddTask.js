import { useState } from "react";
import { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const AddTask = forwardRef(({ onAdd }, ref) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    if (!text) {
      alert("please add a task");
      return;
    }

    onAdd({ text, day, reminder });

    setText("");
    setDay(new Date());
    setReminder(false);

    e.preventDefault();
  };

  const handleCancelClick = (e) => {
    setText("");
    setDay(new Date());
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
      <Grid container direction="column" alignItems="center">
        <Grid item className="input-field">
          <TextField
            className="mb-3 mt-3 input-field"
            required
            placeholder="Add Task"
            label="Nome Task"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Grid>
        <Grid item className="input-field">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              className="mb-3 input-field"
              label="Date&Time"
              error={true}
              value={day}
              onChange={(newValue) => {
                setDay(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item className="input-field">
          <FormGroup className="mb-3">
            <FormControlLabel label="Set Reminder" control={checkbox} />
          </FormGroup>
        </Grid>
        <Grid item>
          <Button
            sx={{ marginRight: "10px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save Task
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelClick}
          >
            Cancel Task
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});

export default AddTask;
