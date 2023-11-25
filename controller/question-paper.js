const questions = require('../models/question_store');
const pdf = require('html-pdf-node');
const fs = require('fs');
const path = require('path');
const moment = require('moment'); 


const generateHtml = (questions) => {
    const heading = '<h1>Reelo Question Paper</h1>';
    const total_marks = `<h4>Total marks: ${questions.length * 10}</h4>`;
    const questionList = questions.map((question, index) => {
        return `
            <div>
                <p>${index + 1}. ${question.question}</p>
            </div>
        `;
    }).join('');
            
    return `${heading}${total_marks}${questionList}`;
};
        
const question_paper = async (req, res) => {
    const { marks, difficulty } = req.body;
    console.log(req.body);

    try {
        const diff_arr = ['Easy', 'Medium', 'Hard']; 
        var i = 0
        console.log(diff_arr[i])

        var q = [  ];
        while (i < 3){
            var total_n = Math.floor(difficulty[i] * (0.001 * marks))

            total_n = i == 0 ? total_n + 1 : total_n

            console.log(total_n)
            // const query = questions.find({ difficulty: })
            
            // for (const j in total_n){
            const segment = await questions.find({ difficulty: diff_arr[i], $expr: { $lt: [0.5, {$rand: {} } ] } }).limit(total_n)
            // const segment_cursor = await questions.aggregate([
            //     { $match: { difficulty: diff_arr[i] } },
            //     { $sample: { size: total_n } }
            //   ])
              
            // const segment = segment_cursor.toArray();
            q = q.concat(segment)

            console.log(segment.length)
            i++;
        }
        console.log(`The total questions are ${q.length}`)

        if (q.length > marks / 10) {
            // deleting the extra question added for fractional part for number of question
            q = q.slice(1)
        } else if (q.length < marks / 10){
            res.status(401).send("Enough Questions not available")
        } 

        console.log(`The total questions are ${q.length}`)


        // Generate HTML for the questions
        const htmlContent = generateHtml(q);

        // Create a PDF file
        const pdfOptions = { format: 'Letter', margin: { top: '30px', right: '30px', bottom: '30px', left: '30px' } };
        const pdfBuffer = await pdf.generatePdf({ content: htmlContent }, pdfOptions);

        // Save the PDF file
        const fileName = `Question_paper${moment().format('YYYY-MM-DD_HH-mm')}.pdf`;
        const filePath = path.join(__dirname, '..', 'question_paper', fileName);
        fs.writeFileSync(filePath, pdfBuffer);

        // Send the response
        res.send(`marks: ${marks}\ndifficulty: ${difficulty[0]}\nPDF generated successfully: ${fileName}`);

        // res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ "error": error.message });
    }
};

module.exports = question_paper