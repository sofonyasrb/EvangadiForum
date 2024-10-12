import React, { createContext, useEffect, useState } from "react";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import QuestionAndAnswerPage from "./pages/QuestionAndAnswerPage/QuestionAndAnswerPage";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import axios from "./Api/axios";
import Four04 from "./components/Four04/Four04";
import ProtectedRoute from "./components/PtotectedRoute/ProtectedRoute";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import LayOut from "./pages/LayOut/LayOut";
// Create context for user state and logout functionality
export const AppState = createContext();


function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // Function to handle logout
  const handleLogout = () => {
    // Remove token and user-related data from localStorage
    localStorage.removeItem("token");



    localStorage.removeItem("username");
    localStorage.removeItem("userid");

    // Reset user state
    setUser(null);

    // Navigate to login page
    navigate("/login");
  };

  // Function to check if user is logged in
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (err) {
      console.log(err.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    if (token) {
      checkUser();
    }
  });
  // console.log(user)

  return (
    <AppState.Provider value={{ user, setUser, handleLogout }}>
      <Routes>
        <Route path="/" element={<LayOut />}>
       
          <Route path="/" element={
             <ProtectedRoute>
              <HomePage />
              </ProtectedRoute>} />
          
          <Route path="/askquestion" element={
            <ProtectedRoute>
            <AskQuestion />
            </ProtectedRoute>
            } />
          <Route
            path="/QuestionDetail/:questionid"
            element={  <ProtectedRoute>
              <QuestionAndAnswerPage />
              </ProtectedRoute>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={ 
              <Four04 />
              } />
        </Route>
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </AppState.Provider>
  );
}

export default App;
