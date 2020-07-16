// TODO: add title image
import React from 'react';
import Questions from './Questions.js';
import Results from './Results.js';
import { Tab, Segment, Header, Form, TextArea, Input } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = this.getQuizData();
        this.tabs = [
            {
                menuItem: 'Form',
                render: () => { return (
                    <Tab.Pane>
                        <Segment>
                            <Header as='h3'>Intro</Header>
                            <Form.Field
                                control={Input}
                                label="Title"
                                id="reactquiz-title"
                                value={this.state.quizData.title}
                                onChange={e => this.handleTitleChange(e)}
                            />
                            <Form.Field
                                control={Input}
                                label="Description"
                                id="reactquiz-description"
                                value={this.state.quizData.description}
                                onChange={e => this.handleDescriptionChange(e)}
                            />
                        </Segment>

                        <Results
                            data={this.state.quizData.results}
                            onChange={data => this.handleResultsChange(data)}
                        />

                        <Questions
                            data={this.state.quizData.questions}
                            results={this.state.quizData.results}
                            onChange={data => this.handleQuestionsChange(data)}
                        />
                        <input
                            type="hidden"
                            name="reactquiz_data"
                            value={JSON.stringify(this.state)}
                        />
                    </Tab.Pane>
                )}
            },
            {
                menuItem: 'Raw JSON',
                render: () => { return (
                    <Form.Field
                        control={TextArea}
                        label='Raw JSON'
                        id="reactquiz-json"
                        value={JSON.stringify(this.state, null, 4)}
                        rows={JSON.stringify(this.state, null, 4).split('\n').length}
                    />
                )}
            }
        ];
    }

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
            <Form as="div" className="App">
                <Tab panes={this.tabs} />
            </Form>
        );
    }
}

export default App;
