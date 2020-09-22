const { TextControl, TextareaControl } = wp.components;

import { connect } from 'react-redux';

import { getIntro, setIntroTitle, setIntroDescription } from './store-intro.js';

function Intro({ title, description, setIntroTitle, setIntroDescription }) {
    return (
        <>
            <TextControl label="Quiz Title" onChange={ setIntroTitle } value={ title }/>
            <TextareaControl label="Quiz Description" onChange={ setIntroDescription } value={ description } />
        </>
    );
}

const mapStateToProps = (state) => getIntro(state);
export default connect(mapStateToProps, { setIntroTitle, setIntroDescription })(Intro);
