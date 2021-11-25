import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./components/AppContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

const customTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#26a69a",
    },
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={customTheme}>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
};

export default App;
