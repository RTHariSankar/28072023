import React, { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Grid } from "@mui/material";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const userToken = sessionStorage.getItem("userToken");

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
    navigate("/reqForm", {
      state: { updateData: val },
    });
  };

  const deleteClicked = (id) => {
    axios
      .delete(`http://localhost:5000/api/deletepost/${id}`)
      .then((response) => {
        if (response.data.message === "Curriculum deleted successfully") {
          alert(response.data.message);
          fetchDataFromDatabase();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const updateClicked = (val) => {
    navigate("/curriculum", { state: { updateData: val } });
  };

  const handleSearch = (searchParams) => {
    applySearchFilters(searchParams);
  };

  const applySearchFilters = (searchParams) => {
    const filtered = input.filter((val) => {
      // Apply search filters here based on searchParams object
      return (
        (searchParams.trainingName === "" ||
          val.trainingName.includes(searchParams.trainingName)) &&
        (searchParams.trainingArea === "" ||
          val.trainingArea.includes(searchParams.trainingArea)) &&
        (searchParams.trainingCategory === "" ||
          val.trainingCategory.includes(searchParams.trainingCategory)) &&
        (searchParams.trainingInstitution === "" ||
          val.trainingInstitution.includes(searchParams.trainingInstitution))
      );
    });
    setFilteredData(filtered);
  };

  // checkbox approval

  const handleCheckboxChange = (e, val) => {
    if (e.target.checked) {
      val.curriculumApproved = "Approved";

      try {
        axios
          .put(`http://localhost:5000/api/updateRequirement/${val._id}`, val)
          .then((response) => {
            if (response.data.message === "Requirement Updated successfully") {
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
      val.curriculumApproved = "Not Approved";
      try {
        axios
          .put(`http://localhost:5000/api/updateRequirement/${val._id}`, val)
          .then((response) => {
            if (response.data.message === "Requirement Updated successfully") {
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
    if (
      searchResults &&
      searchResults.data &&
      Array.isArray(searchResults.data)
    ) {
      setFilteredData(searchResults.data);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div>
      <Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Appbar />

          <Container style={{ margin: "150px auto" }}>
            <Searchbar
              onSearch={handleSearch}
              onSearchResults={handleSearchResults}
            />

            <TableContainer component={Paper} style={{ marginTop: "25px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead >
                  <TableRow>
                    <TableCell align="left">Sl no.</TableCell>
                    <TableCell align="left">
                      Requirement Name
                    </TableCell>
                    <TableCell align="left">Training Area</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Institution Name</TableCell>
                    <TableCell align="left">
                    Training Hours
                    </TableCell>
                    <TableCell align="center">Actions</TableCell>
                    <TableCell align="center">Approval</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((val, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="tableCell">{i + 1}</TableCell>
                      <TableCell className="tableCell">
                        {val.trainingName}
                      </TableCell>
                      <TableCell className="tableCell">
                        {val.trainingArea}
                      </TableCell>
                      <TableCell className="tableCell">
                        {val.trainingCategory}
                      </TableCell>
                      <TableCell className="tableCell">
                        {val.trainingInstitution}
                      </TableCell>
                      <TableCell className="tableCell">
                        {val.trainingHours}
                      </TableCell>
                      <TableCell align="center">
                        <VisibilityIcon onClick={() => viewClicked(val)} />

                        <UploadFileIcon onClick={() => updateClicked(val)} />

                        <DeleteIcon onClick={() => deleteClicked(val._id)} />
                      </TableCell>
                      <TableCell align="center">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckDefault-${i}`}
                            checked={val.curriculumApproved === "Approved"}
                            onChange={(e) => handleCheckboxChange(e, val)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
