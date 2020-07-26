// TODO: add title image
import React, { useState } from 'react';
import Questions from './Questions.js';
import Intro from './Intro.js';
import Results from './Results.js';

import {connect} from 'react-redux';
import {getQuizDataJSON} from './store';

import {Container, Menu, Form, Header, Input, TextArea} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

function AppMenu(props) {
    const [selected, setSelected] = useState('intro');

    const handleClick = (e, {name}) => setSelected(name);

    const Item = ({name, display}) => (
        <Menu.Item name={name} active={selected === name} onClick={handleClick}> {display} </Menu.Item>
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


function App({quizDataJSON}) {
    return (
        <Container>
            <AppMenu />
            <Intro />
            <Questions />
            <input type="hidden" value={quizDataJSON} />
        </Container>
    );
}

export default connect(state => getQuizDataJSON(state))(App);
