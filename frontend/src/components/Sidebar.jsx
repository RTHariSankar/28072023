import React from 'react';
import '../css/sidebar.css';


const Sidebar = () => {
  const menuItems = [
    { text: 'Home', icon: 'bi-house', link: '/homepage' },
    { text: 'Profile', icon: 'bi-person-circle', link: '#' },
    { text: 'Requirement Form Admin', icon: 'bi-journal-text', link: '/requirementFormAdmin' },
    { text: 'Curriculum Admin', icon: 'bi-pencil-square', link: '/addmodifycurriculumadmin' },
    { text: 'Curriculum Faculty', icon: 'bi-envelope-exclamation', link: '/addmodifycurriculumfaculty' },
    { text: 'Logout', icon: 'bi-door-closed', link: '/' },
  ];

  return (

    <div className="container">
        <div className="row">
        <div className="bg-info col-auto col-md-auto">
          <div>
            {/* <a className="text-decoration-none text-white d-flex d-none d-sm-inline align-itemcenter ms-3 mt-2" href="#">
              <span className="ms-1 fs-4 d-none d-sm-inline">Logo</span>
            </a> */}
            {/* <hr className="text-secondary d-none d-sm-block" /> */}

            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                  <a href={item.link} className="nav-link text-white fs-5" aria-current="page">
                    <i className={`bi ${item.icon}`}></i>
                    <span className="ms-3 d-none d-sm-inline">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
   
      
    
  );
};

export default Sidebar;

