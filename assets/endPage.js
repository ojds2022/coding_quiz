const userFinalScore = document.getElementById('userFinalScore');
const score = localStorage.getItem('userScore');

function displayFinalScore() { // displays the user's final score on the last page
    if (userFinalScore) {
        userFinalScore.innerText = `Your score: ${score}`;
    }
}

displayFinalScore();