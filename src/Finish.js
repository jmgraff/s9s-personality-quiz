import { Card, CardBody, ToggleControl, CheckboxControl } from '@wordpress/components'; //FIXME what is component for bool? Switch?
import { connect } from 'react-redux';

import { setAllowTryAgain, setAllowShare, getFinish, toggleShareButton } from './store-finish.js';
import { share_classes } from './Share.js';

function Finish({ allow_try_again, allow_share, share_buttons, setAllowTryAgain, setAllowShare, toggleShareButton }) {
    const ShareCheckbox = id => (
        <CheckboxControl
            label={id[0].toUpperCase() + id.slice(1)}
            onChange={() => toggleShareButton(id)}
            checked={share_buttons.includes(id)}
        />
    );

    return (
        <Card>
            <CardBody>
                <ToggleControl
                    label='"Try Again" button'
                    help={ allow_try_again ? 'Visible' : 'Hidden' }
                    checked={ allow_try_again }
                    onChange={ () => setAllowTryAgain(!allow_try_again) }
                />
                <ToggleControl
                    label='Share buttons'
                    help={ allow_share ? 'Visible': 'Hidden' }
                    checked={ allow_share }
                    onChange={ () => setAllowShare(!allow_share) }
                />
                { allow_share &&
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '50%' }}>
                            { Object.keys(share_classes).map(k => <ShareCheckbox id={k} />)}
                        </div>
                    </div>
                }
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getFinish(state);
export default connect(mapStateToProps, { setAllowTryAgain, setAllowShare, toggleShareButton })(Finish);
