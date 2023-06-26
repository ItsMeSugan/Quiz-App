const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const loader = document.querySelector("#loader");
const game = document.querySelector("#game");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = { question: loadedQuestion.question };

      // console.log(formattedQuestion);

      const answerChoices = [...loadedQuestion.incorrect_answers];
      // console.log(answerChoices);
      formattedQuestion.answer = Math.floor(Math.random() * 9) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    // game.classList.remove("hidden");
    // loader.classList.add("hidden");
    startGame();
    // questions = loadedQuestions;
    // startGame();
  })
  .catch((err) => console.error(err));

// constant //

const currentBonus = 10;
const maxQuestions = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  // check if we crossed the maximum question limit and if the array is empty
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    // if so terminate the function and locate to different page
    return window.location.assign("end.html");
  }

  // // CHANGE A RANDOM QUESTION IN DOM // //

  // increse the counter + 1
  questionCounter++;
  // HUD //
  // changing question number accordingly in DOM
  progressText.innerText = `Question : ${questionCounter} / ${maxQuestions}`;
  // update the progress bar
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
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
  acceptingAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;
    acceptingAnswer = false;
    //  Select the element where the event happen and store
    const selectedChoice = e.target;
    console.log(selectedChoice);
    const selectedAnswer = selectedChoice.dataset["number"];
    //  Using ternary to find the correct answer
    const classToApply =
      currentQuestion.answer == selectedAnswer ? "Correct" : "InCorrect";

    // HUD //
    // Increase score if the condition is correct
    if (classToApply === "Correct") {
      incrementScore(currentBonus);
    }
    // Adding the class in its parent element to change its style property
    selectedChoice.parentElement.classList.add(classToApply);
    // After 1 sec removing the class in its parent element to change its style property and call the function to get the next question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// HUD //
// function used to increse the score
const incrementScore = function (num) {
  score += num;
  scoreText.innerText = score;
};
