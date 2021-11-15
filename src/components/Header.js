import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "blue"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

//valori di default
Header.defaultProps = {
  title: "Task Tracker",
};

//controlli di tipo, emmet per importarlo "impt"
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

//nota che bgcolor in camelcase, gli inline style li useremo solo quando sono dinamici
//const headingStyle = { color: 'red', backgroundColor: 'black'}

export default Header;
