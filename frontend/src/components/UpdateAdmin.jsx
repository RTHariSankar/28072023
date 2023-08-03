import Sidebar from './Sidebar'
import Navbar from './Navbar'
import '../css/updateAdmin.scss'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { TextField, Button, TextareaAutosize, Container, Grid, Box } from '@mui/material';
const UpdateAdmin = () => {

  const userId = sessionStorage.getItem('userId')

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

if(userId === '64bf73a1f8cf24a4a8c9118f'){
      navigate('/admin');}
      else{
        navigate('/faculty')
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
      const response = await axios.post("http://localhost:5000/upload-file-to-google-drive", formData);
      setUploadStatus(`File uploaded successfully! File ID: ${response.data.fileId}`);
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
      const filteredFiles = files.filter((file) => file.id !== "1UveMe0PhoZWzj2BnPO9z8Jge2m80UH1z");
      setFilesList(filteredFiles);

    } catch (error) {
      console.error("Error fetching files list:", error);
    }
  };
  const handleDelete = async (fileId) => {
    console.log(fileId)
    try {
      const response = await axios.post(`http://localhost:5000/delete-file-from-google-drive/${fileId}`);
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
    <div className='updateAdmin'>
        <Sidebar/>
        <div className="updateAdminContainer">
            <Navbar/>

            {/* skdjfsjkdf */}



            <Container maxWidth="lg" mt={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} md={4} sm={4} xl={4} xxl={4}>
            <form>
              <Box mb={3}>
                <label htmlFor="exampleNameList">Name of Training:</label>
                <TextField
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
              </Box>
              <Box mb={3}>
                <label htmlFor="exampleAreaList">Area of Training:</label>
                <TextField
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
              </Box>
              <Box mb={3}>
                <label htmlFor="exampleCategoryList">Category of Requirement:</label>
                <TextField
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
              </Box>
              <Box mb={3}>
                <label htmlFor="exampleInstitutionList">Name of Institution:</label>
                <TextField
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
              </Box>
              <Box mb={3}>
                <label htmlFor="exampleDataList">No. of hours:</label>
                <TextField
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
              </Box>
            </form>
          </Grid>
          <Grid item xs={12} lg={8} md={8} sm={8} xl={8} xxl={8}>
            <form>
              <Box mb={3}>
                <label htmlFor="exampleFormControlTextarea1">Description:</label>
                <TextareaAutosize
                  sx={{ width: '100%', height: '200px' }}
                  name="curriculumDescription"
                  onChange={inputHandler}
                  value={input.curriculumDescription}
                  id="exampleFormControlTextarea1"
                  rows="10"
                  placeholder="Type here"
                />
              </Box>
              <Box mb={3}>
                <label htmlFor="formFile">Upload curriculum here</label>
                <input type="file" name='file' onChange={handleFileChange} />

      
              </Box>
              <div className="text-center">
                <div className="row">
                  <div>
                  <Button variant="contained" color="secondary" size="large"
                   onClick={handleUpload}>
                      upload
                    </Button>
                    <Button variant="contained" color="secondary" size="large">
                      Download
                    </Button>
                    <Button variant="contained" color="primary" size="large" mx={5} onClick={submitClicked}>
                      Submit
                    </Button>
                    {uploadStatus && <p>{uploadStatus}</p>}
                  </div>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>

            {/* jsdksjdsd,f */}

            <div>
      
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">mimeType</th>
            <th scope="col">DownloadFile</th>
            <th scope="col">DeleteFile</th>
          </tr>
        </thead>
        <tbody>
          {filesList.map((file) => (
            
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.mimeType}</td>
              <td>
                <a href={file.webContentLink} target="_blank" rel="noopener noreferrer">
                Download
                </a>
              </td>
              <td>
                <button onClick={() => handleDelete(file.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    </div>
  )
}

export default UpdateAdmin