import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import App from './App';
import Question from './Questions';

let app = null;

beforeEach(() => {
  window.quizData = {
    title: 'Which 90 Day Fiance Couple Are You?',
    description: 'Find out which couple you are with this super cool quiz!',
    questions: 
    [
      { 
        question: 'Q1',
        answers: 
        [
          { answer: 'Q1A1', value: 'a' },
          { answer: 'Q1A2', value: 'b' },
          { answer: 'Q1A3', value: 'c' },
        ]
      },
      { 
        question: 'Q2',
        answers: 
        [
          { answer: 'Q2A1', value: 'a' },
          { answer: 'Q2A2', value: 'b' },
          { answer: 'Q2A3', value: 'c' },
        ]
      },
      { 
        question: 'Q3',
        answers: 
        [
          { answer: 'Q3A1', value: 'a' },
          { answer: 'Q3A2', value: 'b' },
          { answer: 'Q3A3', value: 'c' },
        ]
      },
    ],
    results: 
    [
      { title: 'A', value: 'a' },   
      { title: 'B', value: 'b' },   
      { title: 'C', value: 'c' },   
    ]
  }

  app = render(<App />);
});

let getQuestions = () => app.getAllByTestId(/question-\d+/); 
let getAnswers = (q) => within(q).getAllByTestId(/answer-\d+/); 

test('Renders', () => {
  const questions = getQuestions();
  expect(questions.length).toBe(3);

  const question0Answers = getAnswers(questions[0]);
  expect(question0Answers.length).toBe(3);
});


test('Add new Question', () => {
  const addQuestionButton = app.getByText(/add question/i);
  const beginningQuestionCount = getQuestions().length
  
  fireEvent.click(addQuestionButton, {button: 1});

  expect(getQuestions().length).toBe(beginningQuestionCount + 1);
});

test('Remove Question', () => {
  const firstQuestion = getQuestions()[0];
});


test('Add new Answer', () => {
  const firstQuestion = getQuestions()[0];
  const addAnswerButton = within(firstQuestion).getByText(/add answer/i);
  const beginningAnswerCount = getAnswers(firstQuestion).length; 

  fireEvent.click(addAnswerButton, {button: 1});
  expect(getAnswers(firstQuestion).length).toBe(beginningAnswerCount + 1);
});
