import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Faculty = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const userToken = sessionStorage.getItem("userToken");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = () => {
    axios
      // .get(`/api/viewdata/${userToken}`)
      .get(`http://localhost:5000/api/viewdata/${userToken}`)

      .then((response) => {
        setInput(response.data.data);
        setFilteredData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const applySearchFilters = (searchParams) => {
    const filtered = input.filter((val) => {
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

  const handleSearch = (searchParams) => {
    applySearchFilters(searchParams);
  };

  const addClicked = (val) => {
    navigate("/curriculum", { state: { updateData: val } });
  };

  const deleteClicked = (val) => {
    if (
      val.curriculumApproved === "Approved" &&
      userId !== "64bf73a1f8cf24a4a8c9118f"
    ) {
      alert("Admin approval is needed to delete this curriculum");
    } else {
      val.curriculumDescription = "Type here";
      try {
        axios
          // .put(`/api/updateRequirement/${val._id}`, val)
          .put(`http://localhost:5000/api/updateRequirement/${val._id}`, val)

          .then((response) => {
            if (response.data.message === "Requirement Updated successfully") {
              alert("Curriculum deleted successfully");
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
                <TableHead>
                  <TableRow>
                    <TableCell>Sl no.</TableCell>
                    <TableCell align="left">Requirement Name</TableCell>
                    <TableCell align="left">Training Area</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Institution</TableCell>
                    <TableCell align="left">Training Hours</TableCell>
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
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left">{val.trainingName}</TableCell>
                      <TableCell align="left">{val.trainingArea}</TableCell>
                      <TableCell align="left">{val.trainingCategory}</TableCell>
                      <TableCell align="left">
                        {val.trainingInstitution}
                      </TableCell>
                      <TableCell align="left">{val.trainingHours}</TableCell>
                      <TableCell align="center">
                        <VisibilityIcon onClick={() => addClicked(val)} />
                        <DeleteIcon onClick={() => deleteClicked(val)} />
                      </TableCell>
                      <TableCell align="center">
                        {val.curriculumApproved}
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

export default Faculty;
