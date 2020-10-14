const { TextControl, TextareaControl, Card, CardBody } = wp.components;

import { connect } from 'react-redux';

import { getIntro, setIntroTitle, setIntroDescription, setImageURL } from './store-intro.js';
import QuizMediaUpload from './QuizMediaUpload.js';

function Intro({ title, description, image_url, setIntroTitle, setIntroDescription, setImageURL }) {
    return (
        <Card>
            <CardBody>
                <QuizMediaUpload
                    onChange={url => setImageURL(url)}
                    src={image_url}
                    width={'100%'}
                    height={300} />
                <TextControl label="Quiz Title" onChange={ setIntroTitle } value={ title } />
                <TextareaControl label="Quiz Description" onChange={ setIntroDescription } value={ description } />
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getIntro(state);
export default connect(mapStateToProps, { setIntroTitle, setIntroDescription, setImageURL })(Intro);
