import { combineReducers } from "redux";
import taskReducer from "./taskReducer";

//in questo caso ho solo un reducer quindi potrei non usarlo
const reducers = combineReducers({
  tasks: taskReducer,
});

export default reducers;
