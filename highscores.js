const highScoreList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(highScoreList);

highScoreList.innerHTML = highScores
  .map((scores) => {
    return `<li class="High-score">${scores.name} - ${scores.score}</li>`;
  })
  .join("");
