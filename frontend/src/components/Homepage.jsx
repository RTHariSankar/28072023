import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Add_modify_curriculum_admin from './Add_modify_curriculum_admin';
import Add_modify_curriculum_faculty from './Add_modify_curriculum_faculty';
// import { useLocation } from 'react-router-dom';

const Homepage = () => {
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('userToken');

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="row ms-1 me-1 mb-1">
          <div className="col col-12 col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xxl-3">
            <Sidebar />
          </div>
          <div className="col col-12 col-lg-9 col-md-9 col-sm-9 col-xl-9 col-xxl-9">
            {userId === '64bf73a1f8cf24a4a8c9118f' ? (
              <Add_modify_curriculum_admin />
            ) : (
              <Add_modify_curriculum_faculty />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
