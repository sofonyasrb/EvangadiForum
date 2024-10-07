import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionAndAnswerPage.css';
import { FaCircleUser } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionAnswerPage = () => {
  <></>
  const navigate = useNavigate();
  const { id } = useParams(); // Get the question id from the URL
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      // Mock data to simulate fetching from a database
      const mockData = {
        title: "Sample Question Title",
        description: "This is a sample question description for testing purposes.",
        answers: [
          { username: "User1", body: "This is the first answer." },
          { username: "User2", body: "This is the second answer." },
        ],
      };

      // Simulate a delay like a real API call
      setTimeout(() => {
        setQuestionTitle(mockData.title);
        setQuestionDescription(mockData.description);
        setAnswers(mockData.answers);
        setIsLoading(false);
      }, 1000); // Simulating a 1-second delay
    };

    fetchQuestionAndAnswers();
  }, [id]);

  // To handle switching from mock data to API call
  // const fetchQuestionAndAnswers = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/questions/${id}`);
  //     setQuestionTitle(response.data.title);
  //     setQuestionDescription(response.data.description);
  //     setAnswers(response.data.answers);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error.message);
  //     setIsLoading(false);
  //   }
  // };

  //OR
  // useEffect(() => {
  //   const fetchQuestionAndAnswers = async () => {
  //     try {
  //       // Use Axios to fetch data from your API endpoint
  //       const response = await axios.get(`/api/questions/${id}`); // Replace with the actual endpoint
  //       const data = response.data; // Assuming the API returns the question object
  
  //       // Update the state with data from API
  //       setQuestionData({ title: data.title, description: data.description });
  //       setAnswers(data.answers);
  //       setIsLoading(false); // Data is loaded
  //     } catch (err) {
  //       setError('Failed to load data. Please try again later.');
  //       setIsLoading(false); // Stop loading if there's an error
  //     }
  //   };
  
  //   fetchQuestionAndAnswers();
  // }, [id]);
  


  const handleAnswerChange = (e) => setNewAnswer(e.target.value);

  const handlePostAnswer = (e) => {
    e.preventDefault();
    if (newAnswer.trim()) {
      // Create a new answer object
      const newAnswerObj = {
        username: 'YourUsername', // Replace this with actual username if available
        body: newAnswer,
      };

      // Update the answers state to include the new answer
      setAnswers((prevAnswers) => [...prevAnswers, newAnswerObj]);
      setNewAnswer(''); // Clear the input field
    }
  };

  return (
    <div className="qa-page">
      <h1>Question</h1>
      <section className="post-question">
        {isLoading ? (
          <p>Loading question...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h2>{questionTitle}</h2>
            <p>{questionDescription}</p>
          </>
        )}
      </section>

      <section className="community-answers">
        <hr />
        <h2 className="section-title">Answers From The Community</h2>
        <hr />
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            <div key={index} className="answer">
              <div className="answer-header">
                <div className="icon-and-name">
                  <FaCircleUser   className="answer-icon answer-icon-extra-large" size={50} />
                  <div>
                    <strong>{answer.username}</strong>
                  </div>
                </div>
                <div className="answer-body">
                  <p>{answer.body}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No answers yet. Be the first to answer!</p>
        )}
      </section>

      <section className="post-answer">
        <div className="heading-container">
          <h2 className="section-title">Answer The Top Question</h2>
        </div>
        <div className="center-button-container">
          <button className="go-to-question-button" onClick={() => navigate('/questions')}>
            Go to Question Page
          </button>
        </div>
        <form onSubmit={handlePostAnswer}>
          <textarea
            value={newAnswer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            required
          />
          <div className='Post-Your-Answer button'>
            <button type="submit">Post Your Answer</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default QuestionAnswerPage;
