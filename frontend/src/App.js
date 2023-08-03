import AdminHome from "./components/AdminHome";
import FacultyHome from "./components/FacultyHome";
import Login from "./components/Login";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Requirementform from "./components/Requirementform";
import UpdateAdmin from "./components/UpdateAdmin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/admin" element={<AdminHome/>}/>
          <Route path="/reqForm" element={<Requirementform/>}/>
          <Route path="/faculty" element={<FacultyHome/>}/>
          <Route path="/updateAdmin" element={<UpdateAdmin/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
