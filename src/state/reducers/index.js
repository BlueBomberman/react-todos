import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import formReducer from "./formReducer";

//in questo caso ho solo un reducer quindi potrei non usarlo
const reducers = combineReducers({
  tasks: taskReducer,
  form: formReducer
});

export default reducers;
