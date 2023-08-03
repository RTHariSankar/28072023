import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import '../css/faculty.scss'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const FacultyHome = () => {
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
    navigate('/updateAdmin', { state: { updateData: val } });
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
    <div className='faculty'>
        <Sidebar/>
        <div className="facultyContainer">
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
                    <TableCell className="tableCell">
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
                  </TableCell>
                    <TableCell className="tableCell">
                    {val.curriculumApproved}
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

export default FacultyHome
