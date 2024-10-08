// import React from "react";
// // import Header from "../Components/Header";
// // import Footer from "../Components/Footer";

// import classes from "./AskQuestion.module.css";

// function AskQuestion() {
//   // const handleAskQuestion = {
//   //     handleAskQuestion}
//   return (
//     <div className="container">
//       {/* <header /> */}
//       {/* <form onSubmit={handleAskQuestion}> */}
     
//       <div class="title-bar">
//         <label for="title"></label>
//         <input type="text" placeholder="Title" />
//       </div>
//       <br />
//       <div class="Question Description">
//         <label for="Question Description"></label>
//         <textarea placeholder="Question Description"></textarea>
//       </div>
//       <div>
//         <button type="submit">Post Your Question</button>
//       </div>
//       {/* </form> */}
//       {/* <Footer /> */}
//     </div>
//   );
// }

// export default AskQuestion;
// import { useState, useEffect } from "react";
// import axios from "axios";

// function AskQuestion() {
//   const [title, setTitle] = useState("");
//   const [question, setQuestion] = useState("");
//   const [error, setError] = useState("");
//   const [selectData, setSelectData] = useState([]);

//   useEffect(() => {
//     let processing = true;

//     const fetchData = async () => {
//       try {
//         const res = await axios.get("/");
//         if (processing) {
//           setSelectData(res.data);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();

//     return () => {
//       processing = false;
//     };
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(title + " | " + question);

//     if (!question) {
//       setError(
//         <p className="required">
//           No question inserted. Please type your question.
//         </p>
//       );
//     } else {
//       setError("");
//       // Here you could also add the logic to submit the question
//     }
//   };

//   return (
//     <>
//       <div className="steps">
//         <h2>Steps to Write a Good Question</h2>
//         <ul>
//           <li>Summarize your problem in a one-line title.</li>
//           <li>Describe your problem in more detail.</li>
//           <li>Describe what you tried and what you expected to happen.</li>
//           <li>Review your question and post it to the site.</li>
//         </ul>
//       </div>

//       <div className="ask-public-question">
//         <h1>ask public question</h1>
//         <h2>Go to Question Page</h2>
//       </div>

     
//       <form className="questionForm" onSubmit={handleSubmit}>
//         <label>Title</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={title}
//           onChange={(event) => setTitle(event.target.value)}
//         />

//         <label>Description</label>
//         <textarea
//           id="question"
//           name="message"
//           value={question}
//           onChange={(event) => setQuestion(event.target.value)}
//         />

//         {error}
//         <button type="submit">Post Your Question</button>
//       </form>
//     </>
//   );
// }

// export default AskQuestion;

// import { useState, useEffect } from "react";
// import axios from "axios";

// function AskQuestion() {
//   const [title, setTitle] = useState("");
//   const [question, setQuestion] = useState("");
//   const [error, setError] = useState("");
//   const [selectData, setSelectData] = useState([]);

//   useEffect(() => {
//     let processing = true;

//     const fetchData = async () => {
//       try {
//         const res = await axios.get("https://your-api-endpoint.com/questions"); // Replace with your API endpoint
//         if (processing) {
//           setSelectData(res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();

//     return () => {
//       processing = false;
//     };
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(title + " | " + question);

//     if (!question) {
//       setError(
//         <p className="required">
//           No question inserted. Please type your question.
//         </p>
//       );
//       return;
//     } else {
//       setError("");
//     }

//     // Submit the question to the server
//     try {
//       await axios.post("https://your-api-endpoint.com/questions", {
//         title,
//         question,
//       });
//       // Optionally, reset the form or provide feedback
//       setTitle("");
//       setQuestion("");
//       alert("Question submitted successfully!");
//     } catch (err) {
//       console.error("Error submitting question:", err);
//       setError(
//         <p className="required">Failed to submit question. Please try again.</p>
//       );
//     }
//   };

//   return (
//     <>
//       <div className="steps">
//         <h2>Steps to Write a Good Question</h2>
//         <ul>
//           <li>Summarize your problem in a one-line title.</li>
//           <li>Describe your problem in more detail.</li>
//           <li>Describe what you tried and what you expected to happen.</li>
//           <li>Review your question and post it to the site.</li>
//         </ul>
//       </div>

//       <div className="ask-public-question">
//         <h1>Ask a Public Question</h1>
//         <h2>Go to Question Page</h2>
//       </div>

//       <form className="questionForm" onSubmit={handleSubmit}>
  
//       <div class="title-bar">
// //         <label for="title"></label>
// //         <input type="text" placeholder="Title" />
// //       </div>
// //       <br />
// //       <div class="Question Description">
// //         <label for="Question Description"></label>
// //         <textarea placeholder="Question Description"></textarea>
// //       </div>
// //       <div>
// //         <button type="submit">Post Your Question</button>
// //       </div>
//     </>
//   );
// }

// export default AskQuestion;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./AskQuestion.module.css";
// import { AppState } from "../../context/AppState";
// import {useNavigate} from "react-router-dom";

function AskQuestion() {
  // const navigate = useNavigate();
  // const { user } = useContext(AppState);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/questions");
        // If you want to do something with the fetched data, handle it here
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!question.trim() || !title.trim() || !user) {
      setError("Please fill in all fields and ensure you are logged in.");
      return;
    } else {
      setError("");
    }

    try {
      await axios.post("/api/questions", {
        title,
        question,
        user,
      });
      setTitle("");
      setQuestion("");
      alert("Question submitted successfully!");
    } catch (err) {
      console.error("Error submitting question:", err);
      setError("Failed to submit question. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        <h2>Steps to Write a Good Question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      <div className={styles.askPublicQuestion}>
        <h2>Ask a Public Question</h2>
        <a href="/">Go to Question Page</a>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.titleBar}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <br />

        <div className={styles.questionDescription}>
          <label htmlFor="question">Question Description...</label>
          <textarea
            id="question"
            placeholder="Question Description"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Post Your Question</button>
        </div>
      </form>
    </div>
  );
}

export default AskQuestion;
