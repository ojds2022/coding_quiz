const timer = document.getElementById('timer');
let timerSeconds = 60;
const displayQuestions = document.getElementById('questions');

const firstBtn = document.getElementById('firstBtn');
const secondBtn = document.getElementById('secondBtn');
const thirdBtn = document.getElementById('thirdBtn');
const fourthBtn = document.getElementById('fourthBtn');

const firstBtnCorrect = document.querySelector('.firstBtnCorrect');
const secBtnCorrect = document.querySelector('.secBtnCorrect');
const thirdBtnCorrect = document.querySelector('.thirdBtnCorrect');
const fourthBtnCorrect = document.querySelector('.fourthBtnCorrect');

const firstBtnWrong = document.querySelector('.firstBtnWrong');
const secBtnWrong = document.querySelector('.secBtnWrong');
const thirdBtnWrong = document.querySelector('.thirdBtnWrong');
const fourthBtnWrong = document.querySelector('.fourthBtnWrong');

const questions = [
    {questionNum: 1, question: 'Which data type in JavaScript represents a seqence of characters enclosed in single or double quotes?', answer: 'String'},
    {questionNum: 2, question: `Which variable declaration cannot be changed or reassigned?`, answer: 'const'},
    {questionNum: 3, question: `Which data type in JavaScript represents a variable that has been declared but not assigned a value, or a property that doesn't exist?`, answer: 'Undefined'},
    {questionNum: 4, question: `Which data type in JavaScript represents the intentional absence of any value?`, answer: 'Null'},
    {questionNum: 5, question: `What keyword can be used to determine the data type of a variable or an expression?`, answer: 'typeof'},
    {questionNum: 6, question: `What keyword represents a reusable block of code that can be invoked with specific arguments?`, answer: 'function'},
    {questionNum: 7, question: `What is a data type that represents a logical value of either 'true' or 'false'?`, answer: 'Boolean'},
    {questionNum: 8, question: `What keyword is used to terminate the execution of a loop prematurely?`, answer: 'break'},
    {questionNum: 9, question: `What keyword is used to skip the current iteration of a loop and proceed with the next iteration?`, answer: 'continue'},
    {questionNum: 10, question: `What keyword is used to return a value from a function in JavaScript?`, answer: 'return'}
];

let questionsAsked = [];
let randomButtonsArray = [];
let i = 0;
let userScore = 0;
let highScoresArray = JSON.parse(localStorage.getItem('highScoresArray')); // Retrieve the existing array from localStorage

// function timerSeconds(btnClicked) {
//     let seconds = 60;
//     if (btnClicked) {
//         return seconds -= 5;
//     } else {
//         return seconds;
//     }
// };

function quizTimer(seconds) {
    timer.innerText = seconds;

    let intervalId = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            if (!highScoresArray) { // If there's no existing array, create an empty one
                highScoresArray = [];
            }
    
            highScoresArray.push(' ' + userScore); // Push the new userScore value into the array
    
            let updatedArrayString = JSON.stringify(highScoresArray); // Stringify the updated array
    
            localStorage.setItem('highScoresArray', updatedArrayString);
            
            clearInterval(intervalId); // Stops the countdown when it reaches zero
            window.location.href = 'endPage.html'; // Navigates users to the last page when the countdown reaches zero
            console.log(userScore);
            return;
        } else {
            timer.innerText = seconds;
            console.log(seconds);
        }
    }, 1000);
}

quizTimer(timerSeconds);

function randQuestGen(randBtn) {
    if (questionsAsked.length === questions.length) {

        if (!highScoresArray) { // If there's no existing array, create an empty one
            highScoresArray = [];
        }

        highScoresArray.push(' ' + userScore); // Push the new userScore value into the array

        let updatedArrayString = JSON.stringify(highScoresArray); // Stringify the updated array

        localStorage.setItem('highScoresArray', updatedArrayString);

        window.location.href = 'endPage.html'; // Navigates users to the last page when all the questions have been displayed
        return;
    }

    let randNum = Math.floor(Math.random() * 10);
    let secondRandNum = Math.floor(Math.random() * 10);
    let thirdRandNum = Math.floor(Math.random() * 10);
    let fourthRandNum = Math.floor(Math.random() * 10);

    while (questionsAsked.includes(randNum)) {
        randNum = Math.floor(Math.random() * 10);
    }
    displayQuestions.innerHTML = questions[randNum].question;
    questionsAsked.push(randNum);

    while (secondRandNum === randNum || secondRandNum === thirdRandNum || secondRandNum === fourthRandNum) {
        secondRandNum = Math.floor(Math.random() * 10);
    }
    while (thirdRandNum === randNum || thirdRandNum === secondRandNum || thirdRandNum === fourthRandNum) {
        thirdRandNum = Math.floor(Math.random() * 10);
    }
    while (fourthRandNum === randNum || fourthRandNum === secondRandNum || fourthRandNum === thirdRandNum) {
        fourthRandNum = Math.floor(Math.random() * 10);
    }

    if (randBtn === 1) {
        firstBtn.innerHTML = questions[randNum].answer; // correct answer
        secondBtn.innerHTML = questions[secondRandNum].answer;
        thirdBtn.innerHTML = questions[thirdRandNum].answer;
        fourthBtn.innerHTML = questions[fourthRandNum].answer;
    } else if (randBtn === 2) {
        firstBtn.innerHTML = questions[secondRandNum].answer;
        secondBtn.innerHTML = questions[randNum].answer; // correct answer
        thirdBtn.innerHTML = questions[thirdRandNum].answer;
        fourthBtn.innerHTML = questions[fourthRandNum].answer;
    } else if (randBtn === 3) {
        firstBtn.innerHTML = questions[secondRandNum].answer;
        secondBtn.innerHTML = questions[thirdRandNum].answer;
        thirdBtn.innerHTML = questions[randNum].answer; // correct answer
        fourthBtn.innerHTML = questions[fourthRandNum].answer;
    } else if (randBtn === 4) {
        firstBtn.innerHTML = questions[secondRandNum].answer;
        secondBtn.innerHTML = questions[thirdRandNum].answer;
        thirdBtn.innerHTML = questions[fourthRandNum].answer;
        fourthBtn.innerHTML = questions[randNum].answer; // correct answer
    }
}

function isBtnCorrect(btnClicked, randomButtonsArray) {
    i++;
    if (btnClicked === randomButtonsArray[i-1]) {
        showCorrectAnswer(btnClicked);
        userScore ++;
        localStorage.setItem('userScore', userScore); // Saves userScore to local storage
    } else {
        showWrongAnswer(btnClicked);
        
        //timer.innerText = timerSeconds;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let randBtn = Math.ceil(Math.random() * 4);
    randomButtonsArray.push(randBtn);
    randQuestGen(randBtn);
});

firstBtn.addEventListener('click', () => {
    const btnClicked = 1;
    isBtnCorrect(btnClicked, randomButtonsArray);
    let randBtn = Math.ceil(Math.random() * 4);
    randomButtonsArray.push(randBtn);
    randQuestGen(randBtn);
});

secondBtn.addEventListener('click', () => {
    const btnClicked = 2;
    isBtnCorrect(btnClicked, randomButtonsArray);
    let randBtn = Math.ceil(Math.random() * 4);
    randomButtonsArray.push(randBtn);
    randQuestGen(randBtn);
});

thirdBtn.addEventListener('click', () => {
    const btnClicked = 3;
    isBtnCorrect(btnClicked, randomButtonsArray);
    let randBtn = Math.ceil(Math.random() * 4);
    randomButtonsArray.push(randBtn);
    randQuestGen(randBtn);
});

fourthBtn.addEventListener('click', () => {
    const btnClicked = 4;
    isBtnCorrect(btnClicked, randomButtonsArray);
    let randBtn = Math.ceil(Math.random() * 4);
    randomButtonsArray.push(randBtn);
    randQuestGen(randBtn);
});

// Show correct answer
function showCorrectAnswer(correctAnswer) {
    if (correctAnswer === 1) {
        firstBtnCorrect.style.display = 'block'; // Display the correct answer
        setTimeout(function() {
            firstBtnCorrect.style.display = 'none'; // Hide the correct answer after one second
        }, 500); // 500 milliseconds = 0.5 seconds
    } else if (correctAnswer === 2) {
         secBtnCorrect.style.display = 'block'; // Display the correct answer
         setTimeout(function() {
             secBtnCorrect.style.display = 'none'; // Hide the correct answer after one second
         }, 500); // 500 milliseconds = 0.5 seconds
    } else if (correctAnswer === 3) {
        thirdBtnCorrect.style.display = 'block'; // Display the correct answer
        setTimeout(function() {
            thirdBtnCorrect.style.display = 'none'; // Hide the correct answer after one second
        }, 500); // 500 milliseconds = 0.5 seconds
   } else if (correctAnswer === 4) {
        fourthBtnCorrect.style.display = 'block'; // Display the correct answer
        setTimeout(function() {
            fourthBtnCorrect.style.display = 'none'; // Hide the correct answer after one second
        }, 500); // 500 milliseconds = 0.5 seconds
    }
    
}

// Show wrong answer
function showWrongAnswer(wrongAnswer) {
    if (wrongAnswer === 1) {
        firstBtnWrong.style.display = 'block'; // Display the correct answer
        setTimeout(function() {
            firstBtnWrong.style.display = 'none'; // Hide the correct answer after one second
        }, 500); // 500 milliseconds = 0.5 seconds
    } else if (wrongAnswer === 2) {
        secBtnWrong.style.display = 'block'; // Display the correct answer
        setTimeout(function() {
            secBtnWrong.style.display = 'none'; // Hide the correct answer after one second
        }, 500); // 500 milliseconds = 0.5 seconds
    } else if (wrongAnswer === 3) {
        thirdBtnWrong.style.display = 'block'; // Display the correct answer
        setTimeout(function() {
            thirdBtnWrong.style.display = 'none'; // Hide the correct answer after one second
        }, 500); // 500 milliseconds = 0.5 seconds
    } else if (wrongAnswer === 4) {
        fourthBtnWrong.style.display = 'block'; // Display the correct answer
        setTimeout(function() {
            fourthBtnWrong.style.display = 'none'; // Hide the correct answer after one second
        }, 500); // 500 milliseconds = 0.5 seconds
    }
}