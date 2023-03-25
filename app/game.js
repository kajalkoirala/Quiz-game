const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
    question: 'What is 2 + 2?',
    choice1: "4",
    choice2: "4",
    choice3: "22",
    choice4: "44",
    answer: "4"
  },
  {
    question: 'Who wrote the national anthem of Nepal?',
    choice1: "Bishnu Prasad Rimal",
    choice2: "Bishnu Shamsher Rana",
    choice3: "vyalu maila",
    choice4: "Alamatya",
    answer: "vyalu maila"
  },
  {
    question: 'What is apple?',
    choice1: "fruit",
    choice2: "animal",
    choice3: "horse",
    choice4: "cow",
    answer: "fruit"
  },
  {
    question: 'What is cow?',
    choice1: "pet",
    choice2: "carnivorous",
    choice3: "shut up",
    choice4: "go and sleep",
    answer: "go and sleep"
  }
];

// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //spread operator
  console.log(availableQuestions);
 getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
       return window.location.assign('end.html');
      }
  questionCounter++;
  progressText.innerText =  'Question ${questionCounter}/${MAX_QUESTIONS}';

  //update the progress bar
  progressBarFull.style.width = '${(questionCounter/MAX_QUESTIONS)*100}%';

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  availableQuestions.splice(questionIndex, 1); //remove the question from the array which is already available
  acceptingAnswers=true;
};
 choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if(!acceptingAnswers) return;

      acceptingAnswers=false; //return
      const selectedChoice= e.target;
      const selectedAnswers= selectedChoice.dataset["number"];
      
      const classToApply = selectedAnswers == currentQuestion.answer ? 'correct' : 'incorrect'; //ternary operator
      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
   });
 });

incrementScore = num => {
  score += num;
  scoreText.innerText = score;



startGame();
