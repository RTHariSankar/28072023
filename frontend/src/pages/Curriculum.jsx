import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Container,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const Curriculum = () => {
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetchingFiles, setFetchingFiles] = useState(false);

  const LinearIndeterminate = () => {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="secondary" />
      </Box>
    );
  };

  const [input, setInput] = useState({
    trainingName: "",
    trainingArea: "",
    trainingCategory: "",
    trainingInstitution: "",
    trainingHours: "",
    curriculumDescription: "Type here",
    curriculumFile: [""],
    curriculumApproved: "",
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
          .put(
            // `/api/updateRequirement/${location.state.updateData._id}`,
            `http://localhost:5000/api/updateRequirement/${location.state.updateData._id}`,

            input
          )
          .then((response) => {
            if (response.data.message === "Requirement Updated successfully") {
              alert(response.data.message);
              if (userId === "64bf73a1f8cf24a4a8c9118f") {
                navigate("/admin");
              } else {
                navigate("/faculty");
              }
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

  // file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [filesList, setFilesList] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    if (
      input.curriculumApproved === "Approved" &&
      userId !== "64bf73a1f8cf24a4a8c9118f"
    ) {
      alert("Only admin can change this document now");
    } else {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:5000/upload-file-to-google-drive",
          formData
        );

        // Update curriculumFile array in the input state
        const newCurriculumFile = [
          ...input.curriculumFile,
          response.data.fileId,
        ];
        setInput({
          ...input,
          curriculumFile: newCurriculumFile,
        });

        // Make the server request to update the data
        try {
          const updateResponse = await axios.put(
            `http://localhost:5000/api/updateRequirement/${location.state.updateData._id}`,
            {
              ...input,
              curriculumFile: newCurriculumFile,
            }
          );

          if (
            updateResponse.data.message === "Requirement Updated successfully"
          ) {
            alert(updateResponse.data.message);
          } else {
            alert(updateResponse.data.message);
          }
        } catch (error) {
          console.log(error);
        }

        // Display success message and update files list
        // alert(`File uploaded successfully! File ID: ${response.data.fileId}`);
        setSelectedFile(null); // Clear the selected file after successful upload
        fetchFilesList(); // Fetch the updated list of files from the server
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const fetchFilesList = async () => {
    try {
      setFetchingFiles(true);
      // const response = await axios.get("/get-files-list");
      const response = await axios.get("http://localhost:5000/get-files-list");

      const files = response.data.files;
      const filteredFiles = files.filter(
        (file) => file.id !== "1UveMe0PhoZWzj2BnPO9z8Jge2m80UH1z"
      );

      setFilesList(filteredFiles);
      // setFilesList(filteredFiles);
    } catch (error) {
      console.error("Error fetching files list:", error);
    } finally {
      setFetchingFiles(false);
    }
  };

  const handleDelete = async (fileId) => {
    if (
      input.curriculumApproved === "Approved" &&
      userId !== "64bf73a1f8cf24a4a8c9118f"
    ) {
      alert("Only admin can change this document now");
    } else {
      try {
        setDeleting(true);
        await axios.post(
          // `/delete-file-from-google-drive/${fileId}`
          `http://localhost:5000/delete-file-from-google-drive/${fileId}`
        );

        // Delete the fileId from the curriculumFile array in the input state
        const newCurriculumFile = input.curriculumFile.filter(
          (id) => id !== fileId
        );
        setInput({
          ...input,
          curriculumFile: newCurriculumFile,
        });

        // Make the server request to update the data
        try {
          const updateResponse = await axios.put(
            `http://localhost:5000/api/updateRequirement/${location.state.updateData._id}`,
            {
              ...input,
              curriculumFile: newCurriculumFile,
            }
          );

          if (
            updateResponse.data.message === "Requirement Updated successfully"
          ) {
            alert("Curriculum deleted successfully");
          } else {
            alert(updateResponse.data.message);
          }
        } catch (error) {
          console.log(error);
        }

        fetchFilesList(); // Fetch the updated list of files after successful deletion
      } catch (error) {
        console.error("Error deleting file:", error);
      } finally {
        setDeleting(false);
      }
    }
  };

  useEffect(() => {
    fetchFilesList();
  }, []);

  return (
    <div>
      <Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Appbar />
          <Container style={{ marginTop: "95px" }}>
            <Grid container>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                    <Card
                      style={{
                        maxWidth: 500,
                        margin: "auto",
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              required
                              className="form-control me-2"
                              name="trainingName"
                              onChange={inputHandler}
                              value={input.trainingName}
                              list="nameOptions"
                              id="exampleNameList"
                              fullWidth
                              label="Name of Training"
                              inputProps={{
                                readOnly:
                                  userId === "64bf73a1f8cf24a4a8c9118f"
                                    ? false
                                    : true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl required fullWidth>
                              <InputLabel>Area of Training</InputLabel>
                              <Select
                                // InputLabel="Area of Training"
                                name="trainingArea"
                                onChange={inputHandler}
                                value={input.trainingArea}
                                label="Area of Training"
                                list="areaOptions"
                                id="exampleAreaList"
                                variant="outlined"
                                inputProps={{
                                  readOnly:
                                    userId === "64bf73a1f8cf24a4a8c9118f"
                                      ? false
                                      : true,
                                }}
                              >
                                <MenuItem value="FSD">FSD</MenuItem>
                                <MenuItem value="ML-AI">ML-AI</MenuItem>
                                <MenuItem value="DSA">DSA</MenuItem>
                                <MenuItem value="RPA">RPA</MenuItem>
                                <MenuItem value="ST">ST</MenuItem>
                                <MenuItem value="CSA">CSA</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth required>
                              <InputLabel>Category of requirement</InputLabel>
                              <Select
                                name="trainingCategory"
                                label="Category of requirement"
                                onChange={inputHandler}
                                value={input.trainingCategory}
                                list="categoryOptions"
                                id="exampleCategoryList"
                                inputProps={{
                                  readOnly:
                                    userId === "64bf73a1f8cf24a4a8c9118f"
                                      ? false
                                      : true,
                                }}
                              >
                                <MenuItem value="Retail">Retail</MenuItem>
                                <MenuItem value="Academic">Academic</MenuItem>
                                <MenuItem value="Corporate">Corporate</MenuItem>
                                <MenuItem value="Government">
                                  Government
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              className="form-control me-2"
                              name="trainingInstitution"
                              onChange={inputHandler}
                              value={input.trainingInstitution}
                              list="institutionOptions"
                              id="exampleInstitutionList"
                              fullWidth
                              label="Name of Institution"
                              inputProps={{
                                readOnly:
                                  userId === "64bf73a1f8cf24a4a8c9118f"
                                    ? false
                                    : true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              className="form-control"
                              name="trainingHours"
                              onChange={inputHandler}
                              value={input.trainingHours}
                              list="datalistOptions"
                              id="exampleDataList"
                              fullWidth
                              label="No. of hours"
                              inputProps={{
                                readOnly:
                                  userId === "64bf73a1f8cf24a4a8c9118f"
                                    ? false
                                    : true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      inputProps={{
                        readOnly:
                          input.curriculumApproved === "Approved" &&
                          userId !== "64bf73a1f8cf24a4a8c9118f"
                            ? true
                            : false,
                      }}
                      label="Description"
                      variant="outlined"
                      style={{ marginTop: 17 }}
                      required
                      fullWidth
                      multiline
                      rows={8}
                      placeholder="Type here"
                      name="curriculumDescription"
                      onChange={inputHandler}
                      value={input.curriculumDescription}
                      id="exampleFormControlTextarea1"
                    />
                    <Input
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      variant="outlines"
                      label="upload here"
                      fullWidth
                      style={{ marginTop: "27px" }}
                    />
                    <Button
                      size="medium"
                      variant="contained"
                      style={{ marginTop: "17px" }}
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                    <Button
                      size="medium"
                      variant="contained"
                      style={{ marginLeft: "17px", marginTop: "17px" }}
                      onClick={submitClicked}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
          {uploading && <LinearIndeterminate />}
          {fetchingFiles && <LinearIndeterminate />}
          {deleting && <LinearIndeterminate />}
          <Container style={{ marginTop: "10px", marginBottom: "20px" }}>
            <TableContainer component={Paper} style={{ margin: "auto" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Curriculum File</TableCell>
                    <TableCell align="center">DownloadFile</TableCell>
                    <TableCell align="center">DeleteFile</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filesList
                    .filter((file) => input.curriculumFile.includes(file.id))
                    .map((file) => (
                      <TableRow
                        key={file.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {file.name}
                        </TableCell>
                        <TableCell align="center">
                          <a
                            href={file.webContentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <DownloadIcon />
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          <RemoveCircleIcon
                            onClick={() => handleDelete(file.id)}
                          />
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

export default Curriculum;
