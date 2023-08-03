import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';import Sidebar from './Sidebar'
import Navbar from './Navbar'
import '../css/reqForm.scss'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material'

const Requiementform = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [input,setInput] = useState({
      trainingName:'',
      trainingArea:'',
      trainingCategory:'',
      trainingInstitution:'',
      trainingHours:'',
      curriculumDescription:'Type here'
    });
  
  
    useEffect(()=>{
      if(location.state && location.state.updateData){
        setInput(location.state.updateData);
      }
    },[location])
  
  
    const inputHandler = (e) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    };
  
    const submitClicked=(e)=>{
        e.preventDefault();
  
      if (location.state && location.state.updateData) {
        axios
          .put(`http://localhost:5000/api/updateRequirement/${location.state.updateData._id}`, input)
          .then((response) => {
            if (response.data.message === 'Requirement Updated successfully') {
              alert(response.data.message);
              navigate('/admin');
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post('http://localhost:5000/api/requirementAdminPost', input)
          .then((response) => {
            if (response.data.message === 'Requirement added successfully') {
              alert(response.data.message);
              navigate('/admin');
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          })}}
  return (
    <div className='admin'>
        <Sidebar/>
        <div className="adminContainer">
            <Navbar/>

            <div className="reqForm">
            

            <form onSubmit={submitClicked}>
                <Grid  >
                    <Grid item xs={6} >
                        <TextField
                        variant="standard"
                            label="Name of Training "
                            sx={{ minWidth: 380 }}
                            name='trainingName'
                            onChange={inputHandler}
                            value={input.trainingName}
                            required
                        />
                    </Grid>
                    <br />
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: 380 }} variant="standard"  required>
                            <InputLabel>Area of Training</InputLabel>
                            <Select
                                name='trainingArea'
                                value={input.trainingArea}
              
                                onChange={inputHandler}
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
                    
                    <br />
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: 380 }} variant="standard"  required>
                            <InputLabel>Category of requirement</InputLabel>
                            <Select
                                name='trainingCategory'
                                value={input.trainingCategory}
              
                                onChange={inputHandler}
                                required
                            >
                                <MenuItem value="Retail">Retail</MenuItem>
                                <MenuItem value="Academic">Academic</MenuItem>
                                <MenuItem value="Corporate">Corporate</MenuItem>
                                <MenuItem value="Government">Government</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <br />
                    <Grid item xs={6}>
                        <TextField
                        variant="standard"
                            label="Name of Institution"
                            sx={{ minWidth: 380 }}
                            name='trainingInstitution'
                  onChange={inputHandler}
                  value={input.trainingInstitution}
                            required
                        />
                    </Grid>
                    <br />

                    <Grid item xs={12}>
                        <TextField
                        variant="standard"
                            label=">No. of hours"
                            sx={{ minWidth: 380 }}
                            name='trainingHours'
                  value={input.trainingHours}

                  onChange={inputHandler}
                            required
                            
                        />
                    </Grid>
                    <br />


                    <br />

                    

                    <Grid item xs={12}>
                        <Button className='Button' type="submit" variant="contained" color="primary">
                           Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>




        </div>
            </div>


            
        </div>
   
  )
}

export default Requiementform
