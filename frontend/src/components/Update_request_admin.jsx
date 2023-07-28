import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
// import Footer from './Footer';
import axios from 'axios';

const Update_request_admin = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState({
    trainingName: '',
    trainingArea: '',
    trainingCategory: '',
    trainingInstitution: '',
    trainingHours: '',
    curriculumDescription: 'Type here',
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
              navigate('/addmodifycurriculumadmin');
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
                  <label htmlFor="exampleNameList" className="col-form-label">
                    Name of Training:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingName"
                    onChange={inputHandler}
                    value={input.trainingName}
                  
                    list="nameOptions"
                    id="exampleNameList"
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
                  <label htmlFor="exampleAreaList" className="col-form-label">
                    Area of Training:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingArea"
                    onChange={inputHandler}
                    value={input.trainingArea}
                    
                    list="areaOptions"
                    id="exampleAreaList"
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
                  <label htmlFor="exampleCategoryList" className="col-form-label">
                    Category of Requirement:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingCategory"
                    onChange={inputHandler}
                    value={input.trainingCategory}
                    
                    list="categoryOptions"
                    id="exampleCategoryList"
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
                  <label htmlFor="exampleInstitutionList" className="col-form-label">
                    Name of Institution:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control me-2"
                    name="trainingInstitution"
                    onChange={inputHandler}
                    value={input.trainingInstitution}
                    
                    list="institutionOptions"
                    id="exampleInstitutionList"
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
                  <label htmlFor="exampleDataList" className="col-form-label">
                    No. of hours:
                  </label>
                </div>
                <div className="col col-12 col-lg-7 col-md-7 col-sm-7 col-xl-7 col-xxl-7">
                  <input
                    className="form-control"
                    name="trainingHours"
                    onChange={inputHandler}
                    value={input.trainingHours}
                    
                    list="datalistOptions"
                    id="exampleDataList"
                  />
                  <datalist id="datalistOptions">
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
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  name="curriculumDescription"
                  onChange={inputHandler}
                  value={input.curriculumDescription}
                  id="exampleFormControlTextarea1"
                  rows="10"
                  placeholder="Type here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload curriculum here
                </label>
                <input className="form-control" type="file" id="formFile" name='avatar' />
              </div>
              <div className="text-center">
                <div className="row">
                  <div>
                    <button type="submit" className="btn btn-danger btn-lg">
                      Download
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg mx-5"
                      onClick={submitClicked}
                    >
                      Submit
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




export default Update_request_admin