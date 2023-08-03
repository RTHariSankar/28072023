import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import '../css/admin.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Searchbar from './Searchbar';

const AdminHome = () => {
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
    navigate('/reqForm', {
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
    <div className='admin'>
        <Sidebar/>
        <div className="adminContainer">
            <Navbar/>
            <Searchbar onSearch={handleSearch} onSearchResults={handleSearchResults} />

            <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className="tableCell">Sl no.</TableCell>
                    <TableCell className="tableCell">Requirement Name</TableCell>
                    <TableCell className="tableCell">Training Area</TableCell>
                    <TableCell className="tableCell">Category</TableCell>
                    <TableCell className="tableCell">Amount</TableCell>
                    <TableCell className="tableCell">Institution Name</TableCell>
                    <TableCell className="tableCell">Actions</TableCell>
                    <TableCell className="tableCell">Approval</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {filteredData.map((val, i) => (
                    <TableRow key={i}>
                    <TableCell className="tableCell">{i + 1}</TableCell>
                    <TableCell className="tableCell">
                    {val.trainingName}
                    </TableCell>
                    <TableCell className="tableCell">{val.trainingArea}</TableCell>
                    <TableCell className="tableCell">{val.trainingCategory}</TableCell>
                    <TableCell className="tableCell">{val.trainingInstitution}</TableCell>
                    <TableCell className="tableCell">{val.trainingHours}</TableCell>
                    <TableCell className="tableCell"><button
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
                  </button></TableCell>
                    <TableCell className="tableCell">
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
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            
        </div>
    </div>
  )
}

export default AdminHome
