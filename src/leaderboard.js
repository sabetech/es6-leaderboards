class Leaderboard {
    static scores = [];
    static addScore(score){
        this.scores.push(score);
        Leaderboard.render();
    }

    static refreshBoard() {

    }

    static render() {
        const list = document.querySelector('.scores');
        list.innerHTML = "";
        this.scores.forEach((score) => {
            list.innerHTML += `<li>${score.name} ${score.score}</li>`
        });
    }
}

export default Leaderboard;