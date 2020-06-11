import React from 'react';
import "./App.css";
import {
  Switch,
  Route
} from 'react-router-dom';

function Intro(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
	  <img src="https://via.placeholder.com/150" />
	  <div>
		<button onClick={props.onStartQuiz}>Start Quiz</button>
	  </div>
    </div>
  );
}

function Answer(props) {
  return (
    <div className="row">
      <button
            className="answer image-font" 
            onClick={(e) => props.onAnswered(props.data.value, e)}
        >
            {props.data.answer}
        </button>
    </div>
  );
}

function Question(props) {
  return (
    <div>
      <div className="question image-font" style={{backgroundImage: `url(${props.data.image})`}}>{props.data.question}</div>
      <div className="flex-grid">
        {props.data.answers.map((k,v)=><Answer data={k} onAnswered={props.onAnswered} />)}
      </div>
    </div>
  );
}

function Result(props) {
  let modeMap = {};
  let mode = null;
  let result = null;

  props.answers.forEach(answer => {
    if (Object.keys(modeMap).find(x => x === answer)) {
      modeMap[answer]++
    } else {
      modeMap[answer] = 1;
    }
    if (!!!mode || modeMap[answer] > modeMap[mode]) {
      mode = answer;
    }
  });

  result = props.results.find(x => x.value === mode) || 'Nothing';

  return (
    <h1>{result.title}</h1>
  );
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {answers: [], questionNumber: 1};
    this.handleAnswered = this.handleAnswered.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.history = this.props.history;
  }

  componentDidMount() {
    this.history.push("/");
  }

  handleAnswered(value, e) {
    this.setState(p => ({ answers: [...p.answers, value], questionNumber: p.questionNumber + 1}));
    if (this.state.questionNumber > this.props.quizData.questions.length - 1) {
      console.log("Going to results page");
      this.history.push("/results");
    } else {
      console.log(`Going to question ${this.state.questionNumber + 1}`);
      this.history.push(`/question/${this.state.questionNumber + 1}`);
    }
  }

  handleStartQuiz() {
    console.log("Starting quiz");
    this.history.push(`/question/${this.state.questionNumber}`);
  }

  render() {
    return (
      <div id="reactquiz">

        <Switch>

          <Route exact path="/">
            <Intro 
              title={this.props.quizData.title} 
              description={this.props.quizData.description} 
              onStartQuiz={this.handleStartQuiz}
            />
          </Route>

          <Route path="/question/:questionNumber">
            <Question
              data={this.props.quizData.questions[this.state.questionNumber - 1]}
              onAnswered={this.handleAnswered} 
            />
          </Route>

          <Route path="/results">
            <Result 
              answers={this.state.answers} 
              results={this.props.quizData.results} 
            />
          </Route>


        </Switch>

      </div>
    );
  }
}

export default Quiz;
