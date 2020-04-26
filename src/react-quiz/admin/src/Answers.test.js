import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import App from './App';
import Answers from './Answers';


beforeEach(() => {
  let testAnswers = [
    { answer: 'Q1A1', value: 'a' },
    { answer: 'Q1A2', value: 'b' },
    { answer: 'Q1A3', value: 'c' },
  ]

  answers = render(<Answers data={testAnswers} />); 
});

let answers = null;
let getAnswerElements = () => answers.getAllByTestId(/answer-\d+/);

test('Add an answer', () => {
  const originalAnswerCount = getAnswerElements().length;
  answers.getByText(/add answer/i).click();
  expect(getAnswerElements().length).toBe(originalAnswerCount + 1);
});

test('Remove an answer', () => {
  const originalAnswerCount = getAnswerElements().length;
  within(getAnswerElements()[0]).getByTestId(/remove-button/).click();
  expect(getAnswerElements().length).toBe(originalAnswerCount - 1);
});

