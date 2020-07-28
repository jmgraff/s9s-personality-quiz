import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {getIntro, setTitle, setDescription} from './store/intro.js';
import {Container, Menu, Form, Header, Input, TextArea} from 'semantic-ui-react';

function Intro(props) {
    return (
        <Container>
            <Header as='h3'>Intro</Header>
            <Form.Field
                control={Input}
                label="Title"
                id="reactquiz-title"
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
            />
            <Form.Field
                control={Input}
                label="Description"
                id="reactquiz-description"
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
            />
        </Container>
    );
}

const mapStateToProps = state => getIntro(state);

export default connect(mapStateToProps, {setTitle, setDescription})(Intro);

