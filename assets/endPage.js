const userFinalScore = document.getElementById('userFinalScore');
const score = localStorage.getItem('userScore');

function displayFinalScore() {
    if (userFinalScore) {
        userFinalScore.innerText = `Your score: ${score}`;
    }
}

displayFinalScore();