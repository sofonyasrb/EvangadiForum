import React from "react";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { Route,Routes } from "react-router-dom";
// import Footer from "./components/footer/Footer";
import Login from "./components/Login/Login"

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes> */}
      <Login/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
