import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();

  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      {location.pathname === "/" ? (
        <div className="d-flex justify-content-center">
          <Link to="/about" className="pr-2">About</Link>
          <Link to="/form">Form</Link>
        </div>
      ) : (
        <Link to="/">Home</Link>
      )}
    </footer>
  );
};

export default Footer;
