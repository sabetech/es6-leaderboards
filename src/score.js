class Score {
  constructor(name, score) {
    this.user = name;
    this.score = score;
  }

  display() {
    return `${this.user} ${this.score}`;
  }
}

export default Score;