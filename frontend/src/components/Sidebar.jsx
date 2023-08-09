import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const Sidebar = () => {
  const userId = sessionStorage.getItem('userId')
  const navigate = useNavigate()
  const logout = ()=>{
    sessionStorage.clear();
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
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Typography variant="h4" align="center" color={"#6439ff"} mt={2}>
            ICTAK
          </Typography>

          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={reqFormNav}>
                <ListItemIcon >
                  <InsertDriveFileIcon color="#6439ff" />
                </ListItemIcon>
                <ListItemText primary="Requirement Form" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={AdminView}>
                <ListItemIcon>
                  <WysiwygIcon />
                </ListItemIcon>
                <ListItemText primary="Admin View" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton  onClick={facultyPage}>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Faculty View" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Faculty" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton  onClick={logout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default Sidebar;
