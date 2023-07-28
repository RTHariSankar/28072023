import React, { useState, useEffect } from 'react';
import Search_bar from './Search_bar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add_modify_curriculum_faculty = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const userToken = sessionStorage.getItem('userToken')

  const fetchDataFromDatabase = () => {
    axios
      .get(`http://localhost:5000/api/viewdata/${userToken}`)
      .then((response) => {
        setInput(response.data.data);
        setFilteredData(response.data.data); // Initialize filteredData with the initial data
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

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

  const handleSearch = (searchParams) => {
    applySearchFilters(searchParams);
  };

  const addClicked = (val) => {
    navigate('/NewRequestFaculty', { state: { updateData: val } });
  };

  const deleteClicked = (val) => {
    if (val.curriculumApproved === 'Not Approved') {
      val.curriculumDescription = 'Type here';
      try {
        axios
          .put(`http://localhost:5000/api/updateRequirement/${val._id}`, val)
          .then((response) => {
            if (response.data.message === 'Requirement Updated successfully') {
              alert('Curriculum deleted successfully');
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
      alert('Admin approval is needed to delete this curriculum');
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
      <div className="container text-center mt-5 mb-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Sl no.</th>
              <th scope="col">Training Name</th>
              <th scope="col">Training Area</th>
              <th scope="col">Training Category</th>
              <th scope="col">Training Institution</th>
              <th scope="col">Training Hours</th>
              <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((val, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{val.trainingName}</td>
                <td>{val.trainingArea}</td>
                <td>{val.trainingCategory}</td>
                <td>{val.trainingInstitution}</td>
                <td>{val.trainingHours}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success btn-sm fw-semibold me-3"
                    onClick={() => {
                      addClicked(val);
                    }}
                  >
                    Add/View
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm fw-semibold"
                    onClick={() => {
                      deleteClicked(val);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>{val.curriculumApproved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="container mt-5">
        <Footer />
      </div> */}
    </div>
  );
};

export default Add_modify_curriculum_faculty;