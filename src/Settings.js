import { Card, CardBody, ToggleControl, CheckboxControl, TextControl, TextareaControl } from '@wordpress/components';
import { connect } from 'react-redux';

import { setAllowTryAgain, setAllowShare, getSettings, setShareTitle,
    setShareDescription, setShareHashtags, setForceShare } from './store-settings.js';
import ShareSettings from './ShareSettings.js';

function Settings(props) {
    const {
        allow_try_again,
        allow_share,
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
                { PREMIUM && <ShareSettings /> }
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getSettings(state);
export default connect(mapStateToProps, { setAllowTryAgain, setAllowShare,  setShareTitle,
    setShareDescription, setShareHashtags, setForceShare })(Settings);
