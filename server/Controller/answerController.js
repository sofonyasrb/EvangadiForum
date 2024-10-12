const dbConnection = require('../db/dbConfig');
const { StatusCodes } = require('http-status-codes');
// const uuidv4 = require('uuid').v4;

const answerForQuestion = async function (req, res) {
    const { questionid } = req.params; // Get the question_id from request parameters
    // console.log('Received questionid:', questionid); // Log received question_id for debugging

    // try {
    //     const [answers] = await dbConnection.query(
    //         `SELECT a.question_id, a.answer_id, a.answer, u.username AS username, a.user_id
    //         FROM answers a
    //         JOIN users u ON a.user_id = u.user_id
    //         WHERE a.question_id = ?;
    // `,
    //         [question_id]
    //     );

    //     if (!answers || answers.length === 0) {
    //         return res.status(StatusCodes.NOT_FOUND).json({
    //             err: 'Not Found',
    //             msg: 'The requested question has no answers yet.',
    //         });
    //     }

    //     res.status(StatusCodes.OK).json({ answers });
    // } catch (err) {
    //     console.error('Error fetching answers:', err); 
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //         err: err.message,
    //         msg: 'An unexpected error occurred.',
    //     });
    // }
    // const {questionid} = req.params

const response = await dbConnection.query('select users.username, answers.answer from users join answers on answers.userid= users.userid where answers.questionid = ?', [questionid])
   
    res.status(200).json(response[0])
    // console.log(response)
};

// Post an answer to a question
const postAnswer = async function (req, res) {
    const { userid,questionid, answer } = req.body;
    // const { user_id, username } = req.user; 

    // Validate answer input
    if (!answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: 'Bad Request',
            msg: 'Please provide an answer.',
        });
    }

    if (!userid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: 'Unauthorized',
            msg: 'User not authenticated.',
        });
    }

    try {
        // const answerid = uuidv4(); 

        await dbConnection.query(
            `
        INSERT INTO answers ( questionid, userid, answer)
        VALUES (?, ?, ?)
    `,
            [questionid, userid, answer]
        );

        res.status(StatusCodes.CREATED).json({
            msg: 'Answer posted successfully.',
        });
    } catch (err) {
        console.error('Error posting answer:', err); 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err: err.message,
            msg: 'An unexpected error occurred.',
        });
    }
};

module.exports = { answerForQuestion, postAnswer };