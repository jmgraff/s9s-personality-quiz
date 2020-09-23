import { MemoryRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
const { render, useState, useEffect } = wp.element;

function Result(props) {
    return (
        <h4>Results</h4>
    );
}

function Question(props) {
    return (
        <div>
            <h4>{props.data.title}</h4>
            <button onClick={props.nextQuestion}>Next</button>
        </div>
    );
}

function Intro(props) {
    return (
        <div>
            <h4>{props.data.title}</h4>
            <p>{props.data.description}</p>
            <button onClick={props.onStartQuiz}>Start Quiz</button>
        </div>
    );
}

function S9SPersonalityQuiz(props) {
    const { intro, results, questions, answers } = props.data;
    const [questionNumber, setQuestionNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const history = useHistory();

    useEffect(() => history.push('/'), []);

    const nextQuestion = () => {
        let nextQuestionNumber = questionNumber + 1;

        if (nextQuestionNumber < questions.length) {
            history.push(`/question/${nextQuestionNumber}`);
            setQuestionNumber(nextQuestionNumber);
        } else {
            history.push('/results');
            setQuestionNumber(0);
        }
    }

    return (
        <Switch>
            <Route exact path="/">
                <Intro data={intro} onStartQuiz={() => history.push(`/question/0`)}/>
            </Route>
            <Route path="/question/:questionNumber">
                <Question data={questions[questionNumber]} nextQuestion={nextQuestion}/>
            </Route>
            <Route path="/results">
                <Result data={results} answers={userAnswers} />
            </Route>
        </Switch>
    );
}

document.querySelectorAll('.wp-block-s9s-personality-quiz').forEach(e => {
    render(<Router><S9SPersonalityQuiz data={JSON.parse(e.getAttribute('data-quiz'))} /></Router>, e);
});
