const { render, useState, useEffect } = wp.element;

import { MemoryRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import format from 'string-template';

import { Share, createHashtagList } from './Share.js';


function Result(props) {
    const [shared, setShared] = useState(false);
    const {
        allow_try_again,
        allow_share,
        force_share,
        share_buttons,
        share_title,
        share_description,
        share_hashtags,
    } = props.settings;

    let modeMap = {};
    let mode = null;
    let result = null;

    props.userAnswers.forEach(answer => {
        if (Object.keys(modeMap).find(x => x === answer.result_id)) {
          modeMap[answer.result_id]++;
        } else {
          modeMap[answer.result_id] = 1;
        }
        if (!!!mode || modeMap[answer.result_id] > modeMap[mode.id]) {
          mode = props.results.find(r => r.id === answer.result_id);
        }
    });

    result = props.results.find(result => result.id === mode.id);

    const formattedShareTitle = format(share_title, { title: result.title });
    const formattedShareDescription = format(share_description, { description: result.description });
    const hashtags = createHashtagList(share_hashtags);
    const tags = hashtags;
    const hashtag = hashtags ? hashtags[0] : undefined;

    const shareButtonAttributes = {
        url: window.location,
        via: window.location,
        media: result.image_url,
        image: result.image_url,
        imageUrl: result.image_url,
        title: formattedShareTitle,
        subject: formattedShareTitle,
        description: formattedShareDescription,
        caption: formattedShareDescription,
        body: formattedShareDescription,
        summary: formattedShareDescription,
        quote: formattedShareDescription,
        hashtag,
        hashtags,
        tags
    };

    return (
        <>
            { (!force_share || shared) &&
                <>
                    <img src={result.image_url} style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: '300px',
                        width: 'auto',
                        height: 'auto',
                        margin: 'auto'
                    }} />
                    <h4>{result.title}</h4>
                    <p>{result.description}</p>
                </>
            }
            { (force_share && !shared) &&
                <h3>Share to see your results!</h3>
            }
            { allow_share && share_buttons.length > 0 &&
                <Share ids={share_buttons} atts={shareButtonAttributes} onShare={() => setShared(true)} />
            }
            { (!force_share || shared) && allow_try_again &&
                <button onClick={() => props.onTryAgain()}>
                    Try Again
                </button>
            }
        </>
    );
}

function Question(props) {
    return (
        <>
            <img src={props.question.image_url} />
            <h4>{props.question.title}</h4>
            {props.answers.map(a => (
                <button style={{width: '100%', display: 'block', margin: '0.1em'}} onClick={() => props.onAnswered(a)}>
                    {a.title}
                </button>
            ))}
        </>
    );
}

function Intro(props) {
    return (
        <>
            <img src={props.data.image_url} />
            <h4>{props.data.title}</h4>
            <p>{props.data.description}</p>
            <button onClick={props.onStartQuiz}>Start Quiz</button>
        </>
    );
}

function S9SPersonalityQuiz(props) {
    const { intro, results, questions, answers, settings } = props.data;
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

    const onTryAgain = () => {
        history.push('/');
        setUserAnswers([]);
    }

    return (
        <Switch>
            <div style={{maxWidth: "600px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <Route exact path="/">
                    <Intro data={intro} onStartQuiz={() => history.push('/question/0')}/>
                </Route>
                <Route path="/question/:questionNumber">
                    <Question
                        question={questions[questionNumber]}
                        answers={answers.filter(a => a.question_id == questions[questionNumber].id)}
                        onAnswered={onAnswered}
                    />
                </Route>
                <Route path="/results">
                    <Result
                        results={results}
                        userAnswers={userAnswers}
                        settings={settings}
                        onTryAgain={onTryAgain} />
                </Route>
            </div>
        </Switch>
    );
}

document.querySelectorAll('.wp-block-s9s-personality-quiz').forEach(e => {
    render(<Router><S9SPersonalityQuiz data={JSON.parse(e.getAttribute('data-quiz'))} /></Router>, e);
});
