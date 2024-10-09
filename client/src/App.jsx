import React from "react";
// import HomePage from "./components/HomePage/HomePage";
import  Router  from "./Router";

function App() {
  return (
    <>
      {/* <HomePage /> */}
      <Router/>
    </>
  );
}

export default App;
















// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import HomePage from "./HomePage";
// import AskQuestionPage from "./AskQuestionPage";

// function App() {
//   const [questions, setQuestions] = useState([]);

//   // Function to add a new question
//   const addQuestion = (newQuestion) => {
//     setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage questions={questions} />} />
//         <Route
//           path="/ask-question"
//           element={<AskQuestionPage addQuestion={addQuestion} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

