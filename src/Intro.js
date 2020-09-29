const { TextControl, TextareaControl, Card, CardBody } = wp.components;

import { connect } from 'react-redux';

import { getIntro, setIntroTitle, setIntroDescription } from './store-intro.js';

function Intro({ title, description, setIntroTitle, setIntroDescription }) {
    return (
        <Card>
            <CardBody>
                <TextControl label="Quiz Title" onChange={ setIntroTitle } value={ title }/>
                <TextareaControl label="Quiz Description" onChange={ setIntroDescription } value={ description } />
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getIntro(state);
export default connect(mapStateToProps, { setIntroTitle, setIntroDescription })(Intro);
