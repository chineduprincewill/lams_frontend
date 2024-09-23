import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./public/landing/pages/Landing";
import Login from "./public/login/pages/Login";
import Dashboard from "./protected/dashboard/pages/Dashboard";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./protected/layout/PrivateRoute";
import DefaultLayout from "./protected/layout/DefaultLayout";
import Ahd from "./protected/ahd/pages/Ahd";
import Covid from "./protected/covid/pages/Covid";
import Serology from "./protected/serology/pages/Serology";
import TbHiv from "./protected/tb-hiv/pages/TbHiv";
import ViralLoad from "./protected/viral-load/pages/ViralLoad";
import Eid from "./protected/eid/pages/Eid";
import Users from "./protected/users/pages/Users";

function App() {

  return (
    <div className='w-full relative md:flex justify-center bg-[url("/assets/bg2.jpg")] bg-cover bg-opacity-10'>
      <div className={`absolute inset-0 ${localStorage.getItem('isLoggedIn') ? 'bg-white opacity-90' : 'bg-[#005072] opacity-75'}`}></div>
      <div className="w-full relative z-10">
        <AuthContextProvider>
          <Router>
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/login" element={<Login />} />
                <Route element={<PrivateRoute><DefaultLayout /></PrivateRoute>}>
                  <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path='/ahd' element={<PrivateRoute><Ahd /></PrivateRoute>} />
                  <Route path='/sars-cov2' element={<PrivateRoute><Covid /></PrivateRoute>} />
                  <Route path="/serology" element={<PrivateRoute><Serology /></PrivateRoute>} />
                  <Route path="/tb-hiv" element={<PrivateRoute><TbHiv /></PrivateRoute>} />
                  <Route path="/viral-load" element={<PrivateRoute><ViralLoad /></PrivateRoute>} />
                  <Route path="/eid" element={<PrivateRoute><Eid /></PrivateRoute>} />
                  <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                </Route>
              </Routes>
          </Router>
        </AuthContextProvider>
      </div>
    </div>
    
  )
}

export default App
