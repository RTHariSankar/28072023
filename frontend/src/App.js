import Add_modify_curriculum_admin from "./components/Add_modify_curriculum_admin";
import Add_modify_curriculum_faculty from "./components/Add_modify_curriculum_faculty";
import Homepage from "./components/Homepage";
import Update_request_admin from './components/Update_request_admin';
import New_request_faculty from './components/New_request_faculty';
import Login from "./components/Login";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Requirement_form_admin from './components/Requirement_form_admin';

function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path = '/homepage' element = {<Homepage/>}/>
      <Route path='/addmodifycurriculumadmin' element={<Add_modify_curriculum_admin/>}/>
          <Route path='/addmodifycurriculumfaculty' element={<Add_modify_curriculum_faculty/>}/>
          <Route path='/NewRequestFaculty' element={<New_request_faculty/>}/>
          <Route path='/requirementFormAdmin' element={<Requirement_form_admin/>}/>
          <Route path='/updateAdmin' element={<Update_request_admin/>}/>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
