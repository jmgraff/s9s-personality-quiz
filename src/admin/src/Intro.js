import React from 'react';
import { connect } from 'react-redux';

import { getIntro, setTitle, setDescription } from './store/intro.js';
import { TextArea, Container, Form, Header, Input } from 'semantic-ui-react';

function Intro(props) {
    return (
        <>
            <Header as='h3'>Intro</Header>
            <Form.Input
                control={Input}
                placeholder="Title"
                fluid
                id="reactquiz-title"
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)} />
            <TextArea
                placeholder="Description"
                id="reactquiz-description"
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)} />
        </>
    );
}

const mapStateToProps = state => getIntro(state);

export default connect(mapStateToProps, {setTitle, setDescription})(Intro);

