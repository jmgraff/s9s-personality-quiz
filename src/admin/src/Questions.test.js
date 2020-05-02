import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import Questions from './Questions';


beforeEach(() => {
  let testQuestions = 
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
    ];

  questions = render(<Questions data={testQuestions} />); 
});

let questions = null;
let getQuestionElements = () => questions.getAllByTestId(/question-\d+/);

test('Add an question', () => {
  const originalQuestionCount = getQuestionElements().length;
  questions.getByText(/add question/i).click();
  expect(getQuestionElements().length).toBe(originalQuestionCount + 1);
});

test('Remove a question', () => {
  const originalQuestionCount = getQuestionElements().length;
  within(getQuestionElements()[0]).getByTestId('remove-question-button').click();
  expect(getQuestionElements().length).toBe(originalQuestionCount - 1);
});

