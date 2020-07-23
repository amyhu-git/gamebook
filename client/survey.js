// const { response } = require("express");

const question = document.getElementById("question");
const scenario = document.getElementById('scenario');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const survey = document.getElementById('survey');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questionIndex = 0;
let bias = 2;

let questions = []; 

fetch("questions.json")
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startGame()
    })
    .catch(err => {
        console.error(err);
        alert('ERROR! Something went wrong. Please start again!')
        return window.location.assign("./index.html");
    })

//CONSTANTS
//const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  //score = 0;
  availableQuestions = [...questions]; //full copy of array so changes to available Questions does not affect questions
  console.log(availableQuestions);
  getNewQuestion();
  survey.classList.remove("hidden");
  loader.classList.add('hidden')
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("./end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}`;

  //UPDATE PROGRESS BAR 
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; 


  // const questionIndex = Math.floor(Math.random() * availableQuestions.length);

  // for (let questionIndex=0; questionIndex<availableQuestions.length; questionIndex++) {
  //     currentQuestion = availableQuestions[questionIndex];
  //     console.log(currentQuestion)
  //     question.innerText = currentQuestion.question;
  // }

  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  scenario.innerText = currentQuestion.scenario;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // const classToApply = 'incorrect';
    //     if(selectedAnswer == currentQuestion.answer){
    //         classToApply = 'correct';
    //     }

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    // const classToApply = selectedAnswer == currentQuestion.answer ? questionIndex++ : console.log('false');
    // if(classToApply == 'correct') {
    //     incrementQuestionIndex(bias)
    // }

    selectedChoice.parentElement.classList.add(classToApply); //add to class container

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//////////// FETCH FUNCTION TO POST TO SERVER ///////////////////////////

incrementQuestionIndex = (num) => {
  questionIndex += num;
  console.log(questionIndex);
  return questionIndex;
};
