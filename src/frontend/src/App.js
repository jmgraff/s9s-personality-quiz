import React from 'react';
import Quiz from './Quiz.js';
import { useHistory } from 'react-router-dom';

function App () {
    const history = useHistory();

    if (window.quizData) {
        return (
            <Quiz history={history} quizData={JSON.parse(window.quizData).quizData} />
        );
    }

    return (
        <div>
            <h2>Oops!</h2>
            <h3>Something went wrong.</h3>
            <pre>No data for this quiz</pre>
        </div>
    );

}

export default App;
