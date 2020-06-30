// TODO: add title image
import React from 'react';
import Questions from './Questions.js';
import Results from './Results.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = this.getQuizData();
        console.log('test');
    };

    getQuizData() {
        let blankQuizData = {
            title: '',
            description: '',
            questions: [],
            results: []
        };

        if (!!!window.quizData) {
            return {quizData: blankQuizData};
        } else {
            return JSON.parse(window.quizData);
        }
    }

    handleTitleChange(e) {
        let newState = {...this.state};
        console.log(newState);
        newState.quizData.title = e.target.value;
        this.setState(newState);
    }

    handleDescriptionChange(e) {
        let newState = {...this.state};
        newState.quizData.description = e.target.value;
        this.setState(newState);
    }

    handleQuestionsChange(data) {
        let newState = {...this.state};
        newState.quizData.questions = data;
        this.setState(newState);
    }

    handleResultsChange(data) {
        let newState = {...this.state};
        newState.quizData.results = data;
        this.setState(newState);
    }

    render() {
        return (
            <div className="App">
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="reactquiz-title"
                        value={this.state.quizData.title}
                        onChange={e => this.handleTitleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        id="reactquiz-description"
                        value={this.state.quizData.description}
                        onChange={e => this.handleDescriptionChange(e)}
                    />
                </div>
                <Results
                    data={this.state.quizData.results}
                    onChange={data => this.handleResultsChange(data)}
                />
                <Questions
                    data={this.state.quizData.questions}
                    results={this.state.quizData.results}
                    onChange={data => this.handleQuestionsChange(data)}
                />
                <textarea id="reactquiz-json" name="reactquiz_data" value={JSON.stringify(this.state)}>
                </textarea>
            </div>
        );
    }
}

export default App;
