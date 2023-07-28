import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'
// import Footer from './Footer'

const Requirement_form_admin = () => {

  const location = useLocation();

  const navigate = useNavigate();
  const [input,setInput] = useState({
    trainingName:'',
    trainingArea:'',
    trainingCategory:'',
    trainingInstitution:'',
    trainingHours:'',
    curriculumDescription:'Type here'
  });


  useEffect(()=>{
    if(location.state && location.state.updateData){
      setInput(location.state.updateData);
    }
  },[location])


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitClicked=()=>{

    if (location.state && location.state.updateData) {
      axios
        .put(`http://localhost:5000/api/updateRequirement/${location.state.updateData._id}`, input)
        .then((response) => {
          if (response.data.message === 'Requirement Updated successfully') {
            alert(response.data.message);
            navigate('/addmodifycurriculumadmin');
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post('http://localhost:5000/api/requirementAdminPost', input)
        .then((response) => {
          if (response.data.message === 'Requirement added successfully') {
            alert(response.data.message);
            navigate('/addmodifycurriculumadmin');
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    

  }

  return (
    <div>
      <Navbar/>
      <div className=' container text-center mt-3'><h1>Requirement Form</h1></div>
      <div className="container mt-5">
        <form>
                <div className="row mb-3">
                  <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label for="inputPassword6" className="col-form-label"><h4>Name of Training :</h4></label>
                  </div>
                  <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input className="form-control me-2"
                  name='trainingName'
                  onChange={inputHandler}
                  value={input.trainingName}
                  placeholder="Type here" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label for="inputPassword6" className="col-form-label"><h4>Area of Training :</h4></label>
                  </div>
                  <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input className="form-control me-2"
                  name='trainingArea'
                  value={input.trainingArea}

                  onChange={inputHandler}
                  list="areaOptions" id="exampleAreaList" placeholder="Type here" />
                  <datalist id="areaOptions">
                        <option value="FSD" />
                        <option value="ML-AI" />
                        <option value="DSA" />
                        <option value="RPA" />
                        <option value="ST" />
                        <option value="CSA" />
                      </datalist>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label for="inputPassword6" className="col-form-label"><h4>Category of Requirement :</h4></label>
                  </div>
                  <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input className="form-control me-2" list="categoryOptions"
                  name='trainingCategory'
                  value={input.trainingCategory}

                  onChange={inputHandler} id="exampleCategoryList" placeholder="Type here" />
                  <datalist id="categoryOptions">
                        <option value="Retail" />
                        <option value="Academic" />
                        <option value="Corporate" />
                        <option value="Government" />
                      </datalist>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label for="inputPassword6" className="col-form-label"><h4>Name of Institution :</h4></label>
                  </div>
                  <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input className="form-control me-2"
                  name='trainingInstitution'
                  onChange={inputHandler}
                  value={input.trainingInstitution}

                  placeholder="Type here"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label for="inputPassword6" className="col-form-label"><h4>No. of hours :</h4></label>
                  </div>
                  <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input className="form-control" 
                  name='trainingHours'
                  value={input.trainingHours}

                  onChange={inputHandler}
                  placeholder="Type here"/>  
                  </div>
                </div>
        </form>
      </div>
      {/* <div className="text-center"><button type="submit" className="btn btn-primary btn-lg">
        <a href='/homepage'
        style={{textDecoration:'none',color:'white'}}>Submit</a></button></div> */}
        <div className="text-center"><button type="button" className="btn btn-primary btn-lg"
        onClick={submitClicked}>{location.state && location.state.updateData?'Update':'Submit'}</button></div>
        <div className="container-fluid">
        {/* <Footer/> */}
        </div>
    </div>
  )
}

export default Requirement_form_admin