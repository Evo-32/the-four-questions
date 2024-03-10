const readline = require('readline');

// Define quiz questions and answers as objects
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "What color is the sky?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correctAnswer: "Blue"
    }
];

const initialQuizLength = quizQuestions.length;

let score = 0;

// Function to display a random quiz question
async function displayRandomQuestion() {
    if (quizQuestions.length === 0) {
        endQuiz();
        return;
    }

    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    const questionObj = quizQuestions[randomIndex];

    console.log(`Question: ${questionObj.question}`);
    for (let i = 0; i < questionObj.options.length; i++) {
        console.log(`${i + 1}. ${questionObj.options[i]}`);
    }

    const userAnswer = await getUserInput(`Enter the number of your answer: `);
    checkAnswer(questionObj.options[Number(userAnswer)-1], questionObj.correctAnswer);
}

// Function to get user input
function getUserInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(prompt, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

// Function to check the user's answer
function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        console.log("Correct!");
        score++;
    } else {
        console.log(`Incorrect! The correct answer is ${correctAnswer}.`);
    }

    quizQuestions.splice(quizQuestions.indexOf(correctAnswer), 1);
    displayRandomQuestion();
}

// Function to display the final score
function endQuiz() {
    console.log(`Quiz completed! Your final score is ${score}/${initialQuizLength}.`);
}

// Start the quiz
displayRandomQuestion();