import React,{useContext} from "react";
import "./App.css";
import Home from "./Pages/Home";
import Footer from "./Components/Footer.jsx";
import AboutUs from "./Pages/AboutUs";
import Appointment from "./Pages/Appointment";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import axios from "axios";
import { Context } from "./main.jsx";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);
    // useEffect(() => {
    //   const fetchUser = async () => {
    //     try {
    //       const response = await axios.get(
    //         "http://localhost:5003/api/v1/user/patient/me",
    //         {
    //           withCredentials: true,
    //         }
    //       );
    //       setIsAuthenticated(true);
    //       setUser(response.data.user);
    //     } catch (error) {
    //       setIsAuthenticated(false);
    //       setUser({});
    //     }
    //   };
    //   fetchUser();
    // }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
        <Footer/>
        <ToastContainer position="top-center"/>
      </Router>
    </>
  );
};

export default App;
