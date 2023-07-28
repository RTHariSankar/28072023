import React, { createRef, useEffect, useState } from 'react';
import Navbar from './Navbar';
// import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const New_request_faculty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState({
    trainingName: '',
    trainingArea: '',
    trainingCategory: '',
    trainingInstitution: '',
    trainingHours: '',
    curriculumDescription: 'Type here',
    curriculumApproval: ''
  });

  useEffect(() => {
    if (location.state && location.state.updateData) {
      setInput(location.state.updateData);
    }
  }, [location]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitClicked = () => {
    try {
      if (location.state && location.state.updateData) {
        axios
          .put(`http://localhost:5000/api/updateRequirement/${location.state.updateData._id}`, input)
          .then((response) => {
            if (response.data.message === 'Requirement Updated successfully') {
              alert(response.data.message);
              navigate('/addmodifycurriculumfaculty');
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  var isReadOnly = useState()
  if(location.state.updateData.curriculumApproved === 'Approved'){
    isReadOnly = true;
  }
  else{
    isReadOnly = false;
  }
  // const fileInput = createRef();

  // const downloadClicked = async()=>{
  //   const formData = new FormData();
  //   formData.set("avatar",fileInput.current.value);
  //   try {
  //     const response = await fetch('http://localhost:5000/api/profile',{
  //       method:'POST',
  //       body: formData
  //     })
  //     const parseResponse = await response.json();
  //     if (response.ok) {
  //       alert('file uploaded')
  //     } else {
  //       console.log(error)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <Navbar />
      <div className="container text-center mt-3 mb-5">
        <h1>New Request</h1>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-12 col-lg-4 col-md-4 col-sm-4 col-xl-4 col-xxl-4">
            <form>
              <div className="row mb-3">
                <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label htmlFor="trainingName" className="col-form-label">
                    Name of Training:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingName"
                    onChange={inputHandler}
                    value={input.trainingName}
                    readOnly
                    list="nameOptions"
                    id="trainingName"
                  />
                  <datalist id="nameOptions">
                    <option value="San Francisco" />
                    <option value="New York" />
                    <option value="Seattle" />
                    <option value="Los Angeles" />
                    <option value="Chicago" />
                  </datalist>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label htmlFor="trainingArea" className="col-form-label">
                    Area of Training:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingArea"
                    onChange={inputHandler}
                    value={input.trainingArea}
                    readOnly
                    list="areaOptions"
                    id="trainingArea"
                  />
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
                  <label htmlFor="trainingCategory" className="col-form-label">
                    Category of Requirement:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingCategory"
                    onChange={inputHandler}
                    value={input.trainingCategory}
                    readOnly
                    list="categoryOptions"
                    id="trainingCategory"
                  />
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
                  <label htmlFor="trainingInstitution" className="col-form-label">
                    Name of Institution:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingInstitution"
                    onChange={inputHandler}
                    value={input.trainingInstitution}
                    readOnly
                    list="institutionOptions"
                    id="trainingInstitution"
                  />
                  <datalist id="institutionOptions">
                    <option value="San Francisco" />
                    <option value="New York" />
                    <option value="Seattle" />
                    <option value="Los Angeles" />
                    <option value="Chicago" />
                  </datalist>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 col-xxl-5">
                  <label htmlFor="trainingHours" className="col-form-label">
                    No. of hours:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control"
                    name="trainingHours"
                    onChange={inputHandler}
                    value={input.trainingHours}
                    readOnly
                    list="hoursOptions"
                    id="trainingHours"
                  />
                  <datalist id="hoursOptions">
                    <option value="San Francisco" />
                    <option value="New York" />
                    <option value="Seattle" />
                    <option value="Los Angeles" />
                    <option value="Chicago" />
                  </datalist>
                </div>
              </div>
            </form>
          </div>
          <div className="col col-12 col-lg-8 col-md-8 col-sm-8 col-xl-8 col-xxl-8">
            <form>
              <div className="mb-3">
                <label htmlFor="curriculumDescription" className="form-label">
                  Description:
                </label>
                
                  <textarea
                    className="form-control"
                    name="curriculumDescription"
                    onChange={inputHandler}
                    value={input.curriculumDescription}
                    id="curriculumDescription"
                    rows="10"
                    placeholder="Type here"
                    readOnly={isReadOnly}
                  />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload curriculum here
                </label>
                <input className="form-control" type="file"  name='avatar' />
              </div>
              <div className="text-center">
                <div className="row">
                  <div>
                    <button className="btn btn-danger btn-lg" >
                      Download
                    </button>
                    <button
                      type="button"
                      className={`btn btn-lg mx-5 ${
                        location.state.updateData.curriculumDescription === 'Type here' ? 'btn-warning' : 'btn-primary'
                      }`}
                      onClick={submitClicked}
                    >
                      {location.state.updateData.curriculumDescription === 'Type here' ? 'Update' : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default New_request_faculty;