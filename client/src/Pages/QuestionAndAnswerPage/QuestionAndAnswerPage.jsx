import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionAndAnswerPage.module.css';
import { FaCircleUser } from "react-icons/fa6";
import axios from '../../Api/axios';
import { AppState } from '../../App';
import { toast } from 'react-toastify';

const QuestionAndAnswerPage = () => {
  // console.log("QuestionAndAnswerPage rendered");
  const navigate = useNavigate();
  const { questionid } = useParams();
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");
  const {user} = useContext(AppState)
  const [displayedanswer, setDisplayedanswer] = useState(4)




  useEffect(() => {
    // const fetchQuestionAndAnswers = async () => {
    //   try {
    //     console.log('Fetching question and answers...');
    //     const response = await axios.get(`http://localhost:5500/api/questions/${109}`); // Ensure the API endpoint is correct
    //     console.log("here",response.data);
    //     setQuestionTitle(response.data.question.title);
    //     setQuestionDescription(response.data.question.description);
    //     setAnswers(response.data.answers);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setError('Failed to fetch data. Please try again.');
    //     setIsLoading(false);
    //   }
    // };

    // fetchQuestionAndAnswers();
// console.log("questionid ",questionid)
async function fetchData() {
  try {
    // Check token and questionid
    // console.log("Token: ", token);
    // console.log("Question ID: ", questionid);

    // Make the API call
    const response = await axios.get(`questions/questions/${questionid}`, {
      headers: {
        Authorization: "Bearer " + token
      },
    });

    // Log the API response
    // console.log("API response:", response.data);

    // Access the response data (update based on the actual structure)
    if (response?.data) {
      setData(response?.data[0] || response.data);  // Adjust based on actual structure
    }

    setIsLoading(false);
  } catch (err) {
    console.error("Error details: ", err.response ? err.response : err.message);
    setIsLoading(false);
    setError("Failed to fetch data. Please try again.");
  }
}

    fetchData();
    async function fetchData1() {
      try {
        const response = await axios.get(`/answers/getanswer/${questionid}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        // console.log(response)
        setAnswers(response?.data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }

    fetchData1();
  },[answers]);
// console.log("answers ",answers)

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim()) {
      try {
        // const answerData = { answer: newAnswer, username:  }; // Replace with actual username
        const response = await axios.post(`/answers/answerQuestion`,  {
          userid: user?.userid,
          questionid: questionid,
          answer: newAnswer
        }, {
          headers: {
            Authorization: "Bearer " + token,
          }
        }); // Ensure the API endpoint is correct
        const postedAnswer = response.data;
        setAnswers((prevAnswers) => [...prevAnswers, postedAnswer]);
        setNewAnswer('');
        toast("Answer submitted successfully!");
      } catch (error) {
        setError('Failed to post the answer. Please try again.');
      }
    }
  };
  const handleAnswerClick = (answer) => {
    setDisplayedanswer((answer) => answer+4);
  };
  // console.log(displayedanswer)

  return (
    <div className={styles['qa-page']}>
      {/* Question Header Section */}
      <h1>Question</h1> 
      {/* Question Section */}
      <section className={styles['post-question']}>
        {isLoading ? (
          <p className={styles['loading']}>Loading question...</p>
        ) : error ? (
          <p className={styles['error']}>{error}</p>
        ) : (
          <>
            <h2 className={styles['question-title']}>{data && data?.title} ?</h2>
            <p className={styles['question-description']}>{data && data?.description}</p>
          </>
        )}
      </section>

      {/* Community Answers Section */}
      <section className={styles['community-answers']}>
        <h2 className={styles['section-title']}>Answers From The Community</h2>
        {answers && answers.length > 0 ? (
          answers.slice(0, displayedanswer)?.map((answer, index) => (
            <div key={index} className={styles['answer']}>
              <div className={styles['answer-header']}>
                <div className={styles['icon-and-name']}>
                
                  <FaCircleUser className={styles['answer-icon']} size={50} />
                  <span className={styles['username']}>{answer.username}</span>
                </div>
                <div className={styles['answer-body']}>
                  <p>{answer.answer}</p>
                </div>
              </div>
            </div>
          ))
          
        ) : (
          <p className={styles['no-answers']}>No answers yet. Be the first to answer!</p>
        )}
        {
          
          displayedanswer < answers?.length && (
            <button className={styles['show-more-button']} onClick={handleAnswerClick}>Show More</button>
          )
        }
        {
          displayedanswer >= answers?.length && (
            <p className={styles['no-answers']}>No more answers</p>
          )
        }
      </section>

      {/* Post Answer Section */}
      <section className={styles['post-answer']}>
        <div className={styles['heading-container']}>
          <h2 className={styles['section-title']}>Answer The Top Question</h2>
        </div>
        <div className={styles['center-button-container']}>
          <button className={styles['go-to-question-button']} onClick={() => navigate('/')}>
            Go to Question Page
          </button>
        </div>

        <form className={styles['answer-form']} onSubmit={submitAnswer}>
          <textarea
            className={styles['post-answer-textarea']}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Type your answer here..."
            required
          />
          {error && <p className={styles['error']}>{error}</p>}
          <div className={styles['submit-button-container']}>
            <button type="submit" className={styles['submit-button']}>Post Your Answer</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default QuestionAndAnswerPage;
