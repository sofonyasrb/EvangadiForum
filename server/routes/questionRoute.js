
const dbConnection = require("../db/dbConfig");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');// Function to submit a question
// const submitQuestion = async (req, res) => {
//   try {
//     const { title, desc, userid } = req.body;
// // console.log(req.body)
// // const uniqueId = uuidv4();
// // const questionid = uuidv4();
// // const questionid = uuidv4();;
// const questionid = uuidv4()
//     const [newQuestion] = await dbConnection.query(
//       "INSERT INTO questions (title, description, questionid, userid) VALUES (?, ?, ?, ?)",
//       [title, desc, questionid, userid]

//     );
//     res.status(201).json(newQuestion);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// Function to get all questions

const submitQuestion = async (req, res) => {
  try {
    const { title, desc, userid } = req.body;

    // Generate a UUID for questionid
    const questionid = uuidv4();  // Generates a unique UUID
 
    const newQuestion = await dbConnection.query(
      "INSERT INTO questions (title, description, questionid, userid) VALUES (?, ?, ?, ?)",
      [title, desc, questionid, userid]
    );

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(400).json({ error: error.message });
  }
};
const getAllQuestions = async (req, res) => {
  // try {
  //   const questions = await dbConnection.query("SELECT * FROM questions");
  //   console.log(questions)
  //   res.json(questions[0]);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }

  
  //new code 
  const sql = `SELECT users.userid, users.username, questions.title,questions.questionid, questions.description FROM users JOIN questions ON users.userid = questions.userid;`
      const result =await dbConnection.query(sql)
      console.log(result)
      res.json(result[0])
};

// Function to get a single question by id
// const getSingleQuestion = async (req, res) => {
//   // try {
//   //   const id = req.params.id;
//   //   const question = await dbConnection.query("SELECT * FROM questions WHERE questionid = ?", [
//   //     id,
//   //   ]);
//   //   if (question.length === 0) {
//   //     res.status(404).json({ message: "Question not found" });
//   //   } else {
//   //     res.json(question[0]);
//   //   }
//   // } catch (error) {
//   //   res.status(500).json({ error: error.message });
//   // }

//   //new code

//   const { questionid } = req.params;
//   console.log("questionid: ", questionid);

//   const sql = `SELECT users.username, questions.title, questions.questionid, questions.description 
//               FROM users 
//               JOIN questions ON users.userid = questions.userid 
//               WHERE questions.questionid = ?;`;

//   const result = await dbConnection.query(sql, [questionid]);
//   // console.log(result[0]);
  
//   res.json(result); // Assuming result is an array of rows
// };
const getSingleQuestion = async (req, res) => {
  try {
    const { questionid } = req.params;

    const sql = `
      SELECT users.username, questions.title, questions.questionid, questions.description 
      FROM users 
      JOIN questions ON users.userid = questions.userid 
      WHERE questions.questionid = ?;
    `;

    const [result] = await dbConnection.query(sql, [questionid]);
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Question not found." });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: error.message });
  }
};
// Route to submit a question
router.post("/askquestion", submitQuestion);

// Route to get all questions
router.get("/getallquestions", getAllQuestions);

// Route to get a single question by id
router.get("/questions/:questionid", getSingleQuestion);

module.exports = router;


// const db = require("../db/dbConfig");

// const express = require("express");
// const router = express.Router();


// //submit question
// router.post("/question", submitQuestion);
// router.get("/getallquestions", getAllQuestions);
// //get single question
// router.get("/questions/:id", getSingleQuestion);



// exports.getAllQuestions = async (req, res) => {
//   try {
//     const questions = await db.query("SELECT * FROM questions");
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.submitQuestion = async (req, res) => {
//   try {
//     const { title, description, questionid, userid } = req.body;
//     // const userid = req.user.userid; // Getting the user id from authMiddleware
//     // console.log(userid);
//     // const questionid = uuidv4();
//     // console.log(questionid);
//     //    const [question] = await db.query(
//     //   "select * from questions where title = ? and userid= ?",
//     //   [title, userid, description]
//     // );
//     const newQuestion = await db.query(
//       "INSERT INTO questions (title, description,questionid,userid) VALUES (?,?,?,?)",
//       [title, description, questionid, userid]
//     );
//     res.status(201).json(newQuestion);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getSingleQuestion = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const question = await db.query("SELECT * FROM questions WHERE id = ?", [
//       id,
//     ]);
//     if (question.length === 0) {
//       res.status(404).json({ message: "Question not found" });
//     } else {
//       res.json(question[0]);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };






// module.exports = router;
