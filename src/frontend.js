import { MemoryRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
const { render, useState, useEffect } = wp.element;

function Result(props) {
    let modeMap = {};
    let mode = null;
    let result = null;

    props.userAnswers.forEach(answer => {
        if (Object.keys(modeMap).find(x => x === answer.result_id)) {
          modeMap[answer.result_id]++
        } else {
          modeMap[answer.result_id] = 1;
        }
        if (!!!mode || modeMap[answer.result_id] > modeMap[mode.id]) {
          mode = props.results.find(r => r.id === answer.result_id);
        }
    });

    result = props.results.find(result => result.id === mode.id) || 'Nothing';

    return (
        <div>
            <h1>{result.title}</h1>
            <p>{result.description}</p>
        </div>
    );
}

function Question(props) {
    console.log(props);
    return (
        <div>
            <h4>{props.question.title}</h4>
            {props.answers.map(a => (
                <button onClick={() => props.onAnswered(a)}>
                    {a.title}
                </button>
            ))}
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

    const onAnswered = (answer) => {
        let nextQuestionNumber = questionNumber + 1;
        setUserAnswers([...userAnswers, answer]);

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
                <Question
                    question={questions[questionNumber]}
                    answers={answers.filter(a => a.question_id == questions[questionNumber].id)}
                    onAnswered={onAnswered}
                />
            </Route>
            <Route path="/results">
                <Result results={results} userAnswers={userAnswers} />
            </Route>
        </Switch>
    );
}

document.querySelectorAll('.wp-block-s9s-personality-quiz').forEach(e => {
    render(<Router><S9SPersonalityQuiz data={JSON.parse(e.getAttribute('data-quiz'))} /></Router>, e);
});