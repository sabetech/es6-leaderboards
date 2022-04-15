class Leaderboard {
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

    static async addScore(score) {
      const response = await Leaderboard.saveScore(score);
      const r = await response.json();
      return r;
    }

    static async saveScore(score) {
      try {
        const response = await fetch(`${this.baseUrl}games/${this.uuid}/scores/`, {
          method: 'POST',
          body: JSON.stringify({
            score: score.score,
            user: score.user,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        Leaderboard.refreshBoard();
        return response;
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
        const scores = jsonresponse.result;
        Leaderboard.render(scores);
      } catch (e) {
        throw e.message();
      }
    }

    static render(scores) {
      const list = document.querySelector('.scores');
      list.innerHTML = '';
      scores.forEach((score) => {
        list.innerHTML += `<li>${score.user} ${score.score}</li>`;
      });
    }
}

export default Leaderboard;