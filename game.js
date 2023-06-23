const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptIngAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

// constant //

const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  // check if we crossed the maximum question limit and if the array is empty
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    // if so terminate the function and locate to different page
    return window.location.assign("end.html");
  }

  // // CHANGE A RANDOM QUESTION IN DOM // //
  // increse the counter + 1
  questionCounter++;
  // get a random number and store it in a variable
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // use the random number to select an object from the array and store it in a variable
  currentQuestion = availableQuestions[questionIndex];
  // get the string from the question property from the object and insert into the Element h2 with the id of 'question'
  question.innerText = currentQuestion.question;

  // // CHANGE THE OPTIONS ACCORDING TO THE QUESTION WE GET // //
  // Loop into every elements form array
  choices.forEach((choice) => {
    // store the dataset value of each element in a variable
    const number = choice.dataset["number"];
    // using the value to insert all the choice property from the object
    choice.innerText = currentQuestion["choice" + number];
    // console.log(choice);
  });
  //finaly Delete the question from the array using splice
  availableQuestions.splice(questionIndex, 1);
  acceptIngAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptIngAnswer) return;
    acceptIngAnswer = false;
    //  Select the element where the event happen and store
    const selectedChoice = e.target;
    // console.log(selectedChoice);
    const selectedAnswer = selectedChoice.dataset["number"];
    //  Using ternary to find the correct answer
    const clickToApply =
      currentQuestion.answer == selectedAnswer ? "Correct" : "InCorrect";
      // Adding the class in its parent element to change its style property
    selectedChoice.parentElement.classList.add(clickToApply);
    // After 1 sec removing the class in its parent element to change its style property and call the function to get the next question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(clickToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();
