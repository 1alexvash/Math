import React, { Component } from "react";
import Head from "../components/Head";
import Sounds from "../components/Sounds";
import Timer from "../components/Timer";
import Task from "../components/Task";
import Input from "../components/Input";

class Home extends Component {
  state = {
    preloader: true,
    playing: false,
    buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, "accept", 0, "remove"],
    task: "",
    input: "Type your answer",
    result: 0,
    score: 0,
    mistakes: 0,
    secondsLeft: 60,
    soundsAllowed: true,
    activeClass: ""
  };

  componentDidMount() {
    setTimeout(() => this.setState({ preloader: false }), 5000);
    document.body.addEventListener("keydown", e => {
      if (e.keyCode === 13 && this.state.playing === false) {
        this.startGame();
      } else if (e.keyCode === 13 && this.state.playing === true) {
        this.buttonOnClick("accept");
      } else if (e.keyCode === 8) {
        this.buttonOnClick("remove");
      } else if (!isNaN(parseInt(e.key))) {
        this.buttonOnClick(parseInt(e.key));
      }
    });
  }

  startGame() {
    let playing = true;
    this.newMathTask();
    this.startTimer();
    this.setState({ playing });
  }

  startTimer() {
    let timer = setInterval(() => {
      let secondsLeft = this.state.secondsLeft - 1;
      this.setState({ secondsLeft });
      if (secondsLeft === 0) {
        clearInterval(timer);
        this.setState({ playing: false, secondsLeft: 60 });
      }
    }, 1000);
  }

  buttonOnClick(button) {
    let input = this.state.input;
    this.playSound(".sounds audio.clicking");
    if (typeof button === "number") {
      if (input === "Type your answer") {
        input = "";
      }
      if (button === 0) {
        if (input.length > 0) {
          input = input + button;
          this.setState({ input });
        }
      } else {
        input = input + button;
        this.setState({ input });
      }
    } else if (button === "accept") {
      if (input !== "Type your answer") {
        this.checkTask();
      }
    } else if (button === "remove") {
      if (input !== "Type your answer") {
        input = input.substring(0, input.length - 1);
      }
      if (input.length === 0) {
        input = "Type your answer";
      }
      this.setState({
        input
      });
    }
  }

  checkTask() {
    let solution = parseInt(this.state.input);
    let result = this.state.result;
    let score = this.state.score;
    if (solution === result) {
      score += 15;
      this.playSound(".sounds audio.success");
      this.setState({ activeClass: "success" });
    } else {
      score -= 15;
      this.setState({ mistakes: this.state.mistakes + 1 });
      this.playSound(".sounds audio.failure");
      this.setState({ activeClass: "failure" });
    }
    setTimeout(() => {
      this.setState({ activeClass: "" });
    }, 350);
    this.setState({ input: "Type your answer", score });
    this.newMathTask();
  }

  turnSounds() {
    let soundsAllowed = !this.state.soundsAllowed;
    this.setState({ soundsAllowed });
  }

  playSound(sound) {
    if (this.state.soundsAllowed && this.state.playing) {
      let melody = document.querySelector(sound);
      melody.currentTime = 0;
      melody.play();
    }
  }

  newMathTask() {
    let num1 = Math.ceil(Math.random() * 80) + 10;
    let num2 = Math.ceil(Math.random() * 10);
    let operation = Math.round(Math.random()) === 1 ? "+" : "-";
    let result = operation === "+" ? num1 + num2 : num1 - num2;

    let task = `${num1} ${operation} ${num2}`;
    this.setState({ task, result });
  }
  render() {
    const Preloader = this.state.preloader ? (
      <div className="preloader">
        <div className="preloader-content">
          <img src="/static/images/512-icon.png" className="logo" alt="logo" />
          <p>Loading...</p>
        </div>
      </div>
    ) : (
      ""
    );

    return (
      <div className="app">
        <Head />
        {Preloader}
        {this.state.playing ? (
          <div>
            <Sounds />
            <Timer secondsLeft={this.state.secondsLeft} />
            <Task task={this.state.task} activeClass={this.state.activeClass} />
            <Input input={this.state.input} />
            <div className="controllers">
              {this.state.buttons.map(button => (
                <button key={button} onClick={() => this.buttonOnClick(button)}>
                  {typeof button === "number" ? (
                    button
                  ) : (
                    <img src={`/static/images/${button}.png`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="play">
            <button onClick={() => this.startGame()}>Click To Play</button>
            <div className="music">
              Sounds:
              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked={this.state.soundsAllowed}
                  onClick={() => this.turnSounds()}
                />
                <span className="slider" />
              </label>
            </div>
            <p className="score">
              {this.state.score !== 0
                ? `Your score is: ${this.state.score}`
                : ""}
            </p>
            <p className="mistakes">
              {this.state.mistakes !== 0
                ? `You've made ${this.state.mistakes} ${
                    this.state.mistakes === 1 ? "mistake" : "mistakes"
                  }`
                : ""}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
