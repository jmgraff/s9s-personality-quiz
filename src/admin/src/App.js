// TODO: add title image
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import { getQuizDataJSON } from './store';

import { Form, Container, Menu, Tab } from 'semantic-ui-react';

import Intro from './Intro.js';
import Questions from './Questions.js';
import Results from './Results.js';

function App({ quizDataJSON }) {
    const panes = [
        {
            menuItem: 'Intro',
            render: () => <Tab.Pane attached={false}><Intro /></Tab.Pane>
        },
        {
            menuItem: 'Results',
            render: () => <Tab.Pane attached={false}><Results /></Tab.Pane>
        },
        {
            menuItem: 'Questions',
            render: () => <Tab.Pane attached={false}><Questions /></Tab.Pane>
        },
        {
            menuItem: 'Results Page',
            render: () => <Tab.Pane attached={false}><h1>Coming Soon</h1></Tab.Pane>
        },
    ];
    return (
        <Form as='div'>
            <Tab menu={{pointing: true}} panes={panes} />
            <input type='hidden' name='reactquiz_data' value={ quizDataJSON } />
        </Form>
    );
}

export default connect(state => getQuizDataJSON(state))(App);
