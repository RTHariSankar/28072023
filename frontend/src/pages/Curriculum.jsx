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

  const [input, setInput] = useState({
    trainingName: "",
    trainingArea: "",
    trainingCategory: "",
    trainingInstitution: "",
    trainingHours: "",
    curriculumDescription: "Type here",
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
  const [uploadStatus, setUploadStatus] = useState("");
  const [filesList, setFilesList] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-file-to-google-drive",
        formData
      );
      setUploadStatus(
        `File uploaded successfully! File ID: ${response.data.fileId}`
      );
      setSelectedFile(null); // Clear the selected file after successful upload
      fetchFilesList(); // Fetch the updated list of files from the server
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  const fetchFilesList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-files-list");
      const files = response.data.files;
      const filteredFiles = files.filter(
        (file) => file.id !== "1UveMe0PhoZWzj2BnPO9z8Jge2m80UH1z"
      );
      setFilesList(filteredFiles);
    } catch (error) {
      console.error("Error fetching files list:", error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/delete-file-from-google-drive/${fileId}`
      );
      console.log(response);
      fetchFilesList(); // Fetch the updated list of files after successful deletion
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Fetch the initial list of files when the component mounts
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
                              className="form-control me-2"
                              name="trainingName"
                              onChange={inputHandler}
                              value={input.trainingName}
                              list="nameOptions"
                              id="exampleNameList"
                              fullWidth
                              placeholder="Name of Training"
                              InputProps={{
                                readOnly:
                                  userId === "64bf73a1f8cf24a4a8c9118f"
                                    ? false
                                    : true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl variant="outlined" required fullWidth>
                              <Select
                                name="trainingArea"
                                onChange={inputHandler}
                                value={input.trainingArea}
                                list="areaOptions"
                                id="exampleAreaList"
                                InputProps={{
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
                            <FormControl fullWidth variant="outlined" required>
                              <Select
                                name="trainingCategory"
                                onChange={inputHandler}
                                value={input.trainingCategory}
                                list="categoryOptions"
                                id="exampleCategoryList"
                                InputProps={{
                                  readOnly:
                                    userId === "64bf73a1f8cf24a4a8c9118f"
                                      ? false
                                      : true,
                                }}
                                required
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
                              className="form-control me-2"
                              name="trainingInstitution"
                              onChange={inputHandler}
                              value={input.trainingInstitution}
                              list="institutionOptions"
                              id="exampleInstitutionList"
                              fullWidth
                              placeholder="Name of Institution"
                              InputProps={{
                                readOnly:
                                  userId === "64bf73a1f8cf24a4a8c9118f"
                                    ? false
                                    : true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              className="form-control"
                              name="trainingHours"
                              onChange={inputHandler}
                              value={input.trainingHours}
                              list="datalistOptions"
                              id="exampleDataList"
                              fullWidth
                              placeholder="No. of hours"
                              InputProps={{
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
          <Container style={{ marginTop: "10px", marginBottom: "20px" }}>
            <TableContainer component={Paper} style={{ margin: "auto" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Curriculum File</TableCell>
                    <TableCell align="right">DownloadFile</TableCell>
                    <TableCell align="right">DeleteFile</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filesList.map((file) => (
                    <TableRow
                      key={file.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {file.name}
                      </TableCell>
                      <TableCell align="right">
                        <a
                          href={file.webContentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <DownloadIcon />
                        </a>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
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
