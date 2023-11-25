# Question Paper Generator Application

## Overview

This Node.js application is designed to generate question papers based on specified criteria such as total marks, difficulty distribution, and other attributes. It stores questions in a Question Store and uses these questions to create a question paper that meets the specified requirements.

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/24kushang/Reelo_assignment.git
   cd Reelo_assignment
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```

   The application will start, and you can access it at [http://localhost:3000](http://localhost:3000).

### Base Route (health Check) 

To check whether the server environment is active or not.

Example:
```bash
http://localhost:3000/
```

Adjust the parameters according to your requirements.

### Generating Question Paper

To generate a question paper, send a POST request to `/question-paper` with a JSON payload specifying the requirements for the question paper.

Example:
```bash
http://localhost:3000/api/v1/question-paper
```

Adjust the parameters according to your requirements.

## Code Structure

The code is structured to be modular and extensible. Key components include:

- **`app.js`**: Main entry point for the application.
- **`add_question.js`**: Adds the question to the datastore
- **`question_paper.js`**: Handles the logic for generating question papers based on specified criteria and creates a pdf of the question paper
- **`index.js`**: Defines the API routes for adding questions and generating question papers.

## API Documentation

The code also contains the API Documentation which could be used to query the example request in Postman.
