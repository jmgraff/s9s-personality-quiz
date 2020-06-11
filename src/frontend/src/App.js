import React from 'react';
import Quiz from './Quiz.js';
import { useHistory } from 'react-router-dom';

function App () {
  const history = useHistory();

  return (
    <Quiz history={history} quizData={JSON.parse(window.quizData).quizData} />
  );
}

export default App;
