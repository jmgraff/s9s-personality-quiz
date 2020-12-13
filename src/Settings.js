import { Card, CardBody, ToggleControl, CheckboxControl, TextControl, TextareaControl } from '@wordpress/components';
import { connect } from 'react-redux';

import ShareSettings from './ShareSettings.js';

import { setAllowTryAgain, setAllowShare, getSettings, setShareTitle,
    setShareDescription, setShareHashtags, setForceShare,
    toggleShareButton } from './store-settings.js';

function Settings(props) {
    const {
        allow_try_again,
        setAllowTryAgain
    } = props;

    return (
        <Card>
            <CardBody>
                <ToggleControl
                    label='"Try Again" button'
                    help={ allow_try_again ? 'Visible' : 'Hidden' }
                    checked={ allow_try_again }
                    onChange={ () => setAllowTryAgain(!allow_try_again) }
                />
                <ShareSettings />
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getSettings(state);
export default connect(mapStateToProps, { setAllowTryAgain, setAllowShare,  setShareTitle,
    setShareDescription, setShareHashtags, setForceShare, toggleShareButton })(Settings);
