import { useNavigate } from "react-router-dom";
import "../css/Navbar.scss";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const nav = useNavigate();

  const logout = () => {
    nav('/');
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="dashboard">
          <h1>CURRICULUM DASHBOARD</h1>
        </div>
        <div className="items">
          <div className="item">
            <LogoutIcon className="icon" onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
