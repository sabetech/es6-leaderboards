class Score {
    constructor(name, score){
        this.name = name;
        this.score = score;
    }

    display(){
        return `${this.name} ${this.score}`
    }
}

export default Score;