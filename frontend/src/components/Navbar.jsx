import React from 'react';
import ictaklogo from '../images/ictak.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const homepage = ()=>{
    navigate('/homepage')
  }
  const logout = ()=>{
    navigate('/')
  }
  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-bottom-dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={ictaklogo} alt="Bootstrap" width="55" height="55"  onClick={homepage}/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="/homepage">Home</a> */}
                <a href="#" class="nav-link text-white fs-7 btn-outline-white" aria-current="page" onClick={homepage}>

                <i className='bi bi-house'></i>  
                <span className='ms-3 d-none d-sm-inline' >Home</span>  
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={logout}>
                  <button className="btn btn-outline-danger" type="submit">Logout</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
