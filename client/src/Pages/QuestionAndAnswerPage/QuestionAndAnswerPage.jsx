import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionAndAnswerPage.module.css';
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios';

const QuestionAndAnswerPage = () => {
  console.log("QuestionAndAnswerPage rendered");
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        console.log('Fetching question and answers...');
        const response = await axios.get(`your-api-url/${id}`); // Replace with your actual API URL and include id
        // console.log('Fetched data:', response.data);
        setQuestionTitle(response.data.question.title);
        setQuestionDescription(response.data.question.description);
        setAnswers(response.data.answers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
        setIsLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [id]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim()) {
      try {
        const answerData = { answer: newAnswer, username: 'YourUsername' }; // Replace with actual username
        const response = await axios.post(`/api/questions/${id}/answers`, answerData); // Replace with actual API
        const postedAnswer = response.data;
        setAnswers((prevAnswers) => [...prevAnswers, postedAnswer]);
        setNewAnswer('');
      } catch (error) {
        setError('Failed to post the answer. Please try again.');
      }
    }
  };

  return (
    <div className={styles['qa-page']}>
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
        <h2 className={`${styles['section-title']}`}>Answers From The Community</h2>
        <hr />
        {answers && answers.length > 0 ? (
          answers.map((answer, index) => (
            <div key={index} className={`${styles['answer']}`}>
              <div className={`${styles['answer-header']}`}>
                <div className={`${styles['icon-and-name']}`}>
                  <FaCircleUser className={`${styles['answer-icon']}`} size={50} />
                  <div>
                    <strong>{answer.username}</strong>
                  </div>
                </div>
                <div className={`${styles['answer-body']}`}>
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
        <div className={`${styles['heading-container']}`}>
          <h2 className={`${styles['section-title']}`}>Answer The Top Question</h2>
        </div>
        <div className={`${styles['center-button-container']}`}>
          <button className={`${styles['go-to-question-button']}`} onClick={() => navigate('/questions')}>
            Go to Question Page
          </button>
        </div>

        <form onSubmit={submitAnswer}>
        <textarea
  className={`${styles['post-answer-textarea']}`} // Ensure this class matches your CSS
  value={newAnswer}
  onChange={(e) => setNewAnswer(e.target.value)}
  placeholder="Type your answer here..."
  required
/>
          <div className={`${styles['Post-Your-Answer']}`}>
            <button type="submit">Post Your Answer</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default QuestionAndAnswerPage;
