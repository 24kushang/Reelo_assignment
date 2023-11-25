const questions = require('../models/question_store');

const add_question = async (req, res) => {
    try {
        const ques = new questions(req.body)

        const result = await ques.save()

        res.status(201).send(`${result}`);
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ "error": error.message });
    }
};

module.exports = add_question
