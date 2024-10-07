import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionAndAnswerPage from './Pages/QuestionAndAnswerPage/QuestionAndAnswerPage.jsx';
// import QuestionsPage from './Pages/QuestionPage/QuestionPage.jsx';
 // Import the questions page

//  const App = () => {
//   return (
//     <Router>
//       <div style={{ marginLeft: '20%', marginRight: '20%' }}>
//         <Routes>
          {/* Route to show the list of questions */}
          {/* <Route path="/" element={<QuestionsPage />} /> */}
          {/* <Route path="/questions" element={<QuestionsPage />} /> */}

          {/* Dynamic route to show a specific question and its answers */}
          {/* <Route path="/question/:id" element={<QuestionAndAnswerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; */}

const App = () => {
  return (
    <Router>
      <div style={{ marginLeft: '20%', marginRight: '20%' }}>
        <Routes>
          <Route path="/" element={<QuestionAndAnswerPage />} />
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;

  {/* <Route path="/questions" element={<QuestionAndAnswerPage />} /> 
           <Route path="/question/:id" element={<QuestionAndAnswerPage} />
           <Route path="/question" element={<QuestionAnswerPage />} /> */}