import React from 'react'
import "../css/Sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const userId = sessionStorage.getItem('userId')
  const navigate = useNavigate()
  const logout = ()=>{
    navigate('/')
  }
  const reqFormNav = ()=>{
    if(userId === '64bf73a1f8cf24a4a8c9118f'){
      navigate('/reqForm');
    }
    else{
      alert('only admin has access to it')
    }  }
  const AdminView = ()=>{
    if(userId === '64bf73a1f8cf24a4a8c9118f'){
      navigate('/admin');
    }
    else{
      alert('only admin has access to it')
    }
  }
  const facultyPage = ()=>{
    navigate('/faculty')
  }
  return (
    <div className="sidebar">
      <div className="top">
          <span className="logo">ICTAK</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          
          <p className="title">MAIN</p>
            <li onClick={reqFormNav}>
              <InsertDriveFileIcon className="icon" />
              <span>Requirement Form</span>
            </li>
            <li onClick={AdminView}>
            <WysiwygIcon className="icon" />
            <span>Admin View</span>
          </li>
          <li onClick={facultyPage}>
            <AssignmentIndIcon className="icon" />
            <span>Faculty View</span>
          </li>
          
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
              <PersonOutlineIcon className="icon" />
              <span>Faculty</span>
            </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;