const userHighScores = document.getElementById('userHighScores');
const highScoresArray = localStorage.getItem('highScoresArray');
const parsedArray = JSON.parse(highScoresArray);
const sortedArray = parsedArray.sort((a, b) => b - a); // sorts the array in descending order
const threeHighestScores = sortedArray.slice(0, 3); // takes the first three elements from the sorted array

function displayHighScores() { // displays the user's top three scores on the high scores page
    if (userHighScores) {
        userHighScores.innerText = `Your top 3 scores: ${threeHighestScores}`;
    }
}

displayHighScores();