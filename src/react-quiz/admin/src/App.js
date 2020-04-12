import React from 'react';
import Questions from './Questions.js';

window.quizData = {
  title: 'Which 90 Day Fiance Couple Are You?',
  description: 'Find out which couple you are with this super cool quiz!',
  questions: 
  [
    { 
      question: 'Pick an outfit',
      answers: 
      [
        { answer: 'Whatever is clean', value: 'am' },
        { answer: 'Jeans and a T-Shirt', value: 'ba' },
        { answer: 'Dressy Casual', value: 'aj' },
        { answer: 'Slutty and Skin-tight', value: 'dj' }
      ]
    },
    { 
      question: 'Time of Day',
      answers: 
      [
        { answer: 'Morning', value: 'am' },
        { answer: 'Afternoon', value: 'ba' },
        { answer: 'Evening', value: 'aj' },
        { answer: 'Late night fun', value: 'dj' }
      ]
    },
    { 
      question: 'What are we doing?',
      answers: 
      [
        { answer: 'Taking a walk through nature', value: 'ba' },
        { answer: 'Catching live music', value: 'am' },
        { answer: 'Dancing at a club', value: 'dj' }
      ]
    },
    { 
      question: 'What are we eating?',
      answers: 
      [
        { answer: 'Fancy dinner', value: 'dj' },
        { answer: 'Quick snack from a street vendor', value: 'ba' },
        { answer: 'Ice cream', value: 'am' },
        { answer: 'Who needs food?', value: 'aj' }
      ]
    },
    { 
      question: 'Goodnight kiss?',
      answers: 
      [
        { answer: 'Yes', value: 'am' },
        { answer: 'No', value: 'ba' },
        { answer: 'Why stop there?', value: 'aj' }
      ]
    },
  ],
  results: 
  [
    { title: 'Angela and Michael', value: 'am' },   
    { title: 'Layrissa and Coltee', value: 'lc' },   
    { title: 'Benjamin and Akeni', value: 'ba' },   
    { title: 'Darcy and Jesse', value: 'dj' },   
    { title: 'Ashley and Jay', value: 'aj' }
  ]
}



class App extends React.Component {
  constructor() {
    super();
    this.state = {quizData: this.getQuizData()};
  }

  getQuizData() {
    return window.quizData;
  }

  handleTitleChange(e) {
    this.setState({quizData: {title: e.target.value}});
  }

  handleDescriptionChange(e) {
    this.setState({quizData: {description: e.target.value}});
  }

  handleQuestionsChange(data) {
    this.setState({quizData: {questions: data}});
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input value={this.state.quizData.title} onChange={e => this.handleTitleChange(e)}/>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input value={this.state.quizData.description} onChange={e => this.handleDescriptionChange(e)} />
          </div>
          <Questions data={this.state.quizData.questions} onChange={data => this.handleQuestionsChange(data)} />
        </form>
      </div>
    );
  }
}

export default App;
