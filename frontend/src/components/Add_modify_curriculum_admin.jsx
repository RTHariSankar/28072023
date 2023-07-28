// Add_modify_curriculum_admin.jsx

import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search_bar from './Search_bar';

const Add_modify_curriculum_admin = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const userToken = sessionStorage.getItem('userToken')

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = () => {
    axios
      .get(`http://localhost:5000/api/viewdata/${userToken}`)
      .then((response) => {
        const data = response.data.data;
        setInput(data);
        setFilteredData(data); // Update filteredData with the initial data
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const viewClicked = (val) => {
    navigate('/requirementFormAdmin', {
      state: { updateData: val },
    });
  };

  const deleteClicked = (id) => {
    axios
      .delete(`http://localhost:5000/api/deletepost/${id}`)
      .then((response) => {
        if (response.data.message === 'Curriculum deleted successfully') {
          alert(response.data.message);
          fetchDataFromDatabase();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const updateClicked = (val) => {
    navigate('/updateAdmin', { state: { updateData: val } });
  };

  const handleSearch = (searchParams) => {
    applySearchFilters(searchParams);
  };

  const applySearchFilters = (searchParams) => {
    const filtered = input.filter((val) => {
      // Apply search filters here based on searchParams object
      return (
        (searchParams.trainingName === '' || val.trainingName.includes(searchParams.trainingName)) &&
        (searchParams.trainingArea === '' || val.trainingArea.includes(searchParams.trainingArea)) &&
        (searchParams.trainingCategory === '' || val.trainingCategory.includes(searchParams.trainingCategory)) &&
        (searchParams.trainingInstitution === '' || val.trainingInstitution.includes(searchParams.trainingInstitution))
      );
    });
    setFilteredData(filtered);
  };

// checkbox approval

  const handleCheckboxChange = (e, val) => {
    if (e.target.checked) {
      val.curriculumApproved = 'Approved';

      try {
        axios
          .put(`http://localhost:5000/api/updateRequirement/${val._id}`, val)
          .then((response) => {
            if (response.data.message === 'Requirement Updated successfully') {
              alert(response.data.message);
              fetchDataFromDatabase();
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      val.curriculumApproved = 'Not Approved';
      try {
        axios
          .put(`http://localhost:5000/api/updateRequirement/${val._id}`, val)
          .then((response) => {
            if (response.data.message === 'Requirement Updated successfully') {
              alert(response.data.message);
              fetchDataFromDatabase();
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearchResults = (searchResults) => {
    if (searchResults && searchResults.data && Array.isArray(searchResults.data)) {
      setFilteredData(searchResults.data);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="container text-center mb-3">
        <h1>Curriculum List</h1>
      </div>
      <Search_bar onSearch={handleSearch} onSearchResults={handleSearchResults} />
      <div className="container text-center align-items-center justify-content-center mt-5 mb-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Sl no.</th>
              <th scope="col">Requirement Name</th>
              <th scope="col">Training Area</th>
              <th scope="col">Category</th>
              <th scope="col">Institution Name</th>
              <th scope="col">Training Hours</th>
              <th scope="col">Actions</th>
              <th scope="col">Approval</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((val, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{val.trainingName}</td>
                <td>{val.trainingArea}</td>
                <td>{val.trainingArea}</td>
                <td>{val.trainingArea}</td>
                <td>{val.trainingArea}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => viewClicked(val)}
                    className="btn btn-primary btn-sm fw-semibold"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm mx-3 fw-semibold"
                    onClick={() => updateClicked(val)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm fw-semibold"
                    onClick={() => deleteClicked(val._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={`flexCheckDefault-${i}`}
                      checked={val.curriculumApproved === 'Approved'}
                      onChange={(e) => handleCheckboxChange(e, val)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container mt-5">
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Add_modify_curriculum_admin;