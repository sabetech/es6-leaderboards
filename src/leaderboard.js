class Leaderboard {
    static scores = [];

    static baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

    static uuid = '';

    static async initializeGame() {
      this.uuid = localStorage.getItem('gameKey');
      if (this.uuid) return;
      try {
        const response = await fetch(`${this.baseUrl}games`, {
          method: 'POST',
          body: JSON.stringify({
            name: 'My Awesome Game!',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const jsonresponse = await response.json();
        const gameID = jsonresponse.result.split(':')[1].split(' ')[1];

        this.uuid = gameID;
        localStorage.setItem('gameKey', gameID);
      } catch (e) {
        throw e.message;
      }
    }

    static addScore(score) {
      this.scores.push(score);
      Leaderboard.saveScore(score);
      Leaderboard.render();
    }

    static async saveScore(score) {
      try {
        await fetch(`${this.baseUrl}games/${this.uuid}/scores/`, {
          method: 'POST',
          body: JSON.stringify({
            score: score.score,
            user: score.user,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (e) {
        throw e.message();
      }
    }

    static async refreshBoard() {
      try {
        const response = await fetch(`${this.baseUrl}games/${this.uuid}/scores`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const jsonresponse = await response.json();
        this.scores = jsonresponse.result;
        this.render();
      } catch (e) {
        throw e.message();
      }
    }

    static render() {
      const list = document.querySelector('.scores');
      list.innerHTML = '';
      this.scores.forEach((score) => {
        list.innerHTML += `<li>${score.user} ${score.score}</li>`;
      });
    }
}

export default Leaderboard;