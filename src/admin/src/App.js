// TODO: add title image
import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import { getQuizDataJSON } from './store';

import { Container, Menu } from 'semantic-ui-react';

import Intro from './Intro.js';
import Questions from './Questions.js';
import Results from './Results.js';

function AppMenu(props) {
    const [selected, setSelected] = useState('intro');

    const Item = ({ name, display }) => (
        <Menu.Item name={ name } active={ selected === name } onClick={ (e, { name }) => setSelected(name) }> { display } </Menu.Item>
    );

    return (
        <Menu pointing>
            <Item name="intro" display="Intro" />
            <Item name="results" display="Results" />
            <Item name="questions" display="Questions" />
            <Item name="results-page" display="Results Page" />
        </Menu>
    );
}


function App({ quizDataJSON }) {
    return (
        <Container>
            <AppMenu />
            <Intro />
            <Results />
            <Questions />
            <input type="hidden" value={ quizDataJSON } />
        </Container>
    );
}

export default connect(state => getQuizDataJSON(state))(App);
