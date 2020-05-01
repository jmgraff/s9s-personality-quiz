import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import App from './App';
import Answers from './Answers';

function dummy(x) {};

beforeEach(() => {
  let testAnswers = [
    { answer: 'Q1A1', value: 'a' },
    { answer: 'Q1A2', value: 'b' },
    { answer: 'Q1A3', value: 'c' },
  ]

  answers = render(<Answers data={testAnswers} onChange={x => dummy(x)} />); 
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

test('Move answer up', () => {
  const secondAnswer = getAnswerElements()[1];
  const secondAnswerText = within(secondAnswer).getByTestId(/answer-input/).value;
  within(secondAnswer).getByTestId(/move-up-button/).click();
  expect(within(getAnswerElements()[0]).getByTestId(/answer-input/).value).toBe(secondAnswerText);
});

test('Move answer down', () => {
  const firstAnswer = getAnswerElements()[0];
  const firstAnswerText = within(firstAnswer).getByTestId(/answer-input/).value;
  within(firstAnswer).getByTestId(/move-down-button/).click();
  expect(within(getAnswerElements()[1]).getByTestId(/answer-input/).value).toBe(firstAnswerText);
});
