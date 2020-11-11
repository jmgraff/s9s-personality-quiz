import { Card, CardBody, ToggleControl, CheckboxControl } from '@wordpress/components'; //FIXME what is component for bool? Switch?
import { connect } from 'react-redux';

import { setAllowTryAgain, setAllowShare, getFinish, toggleShareButton } from './store-finish.js';
import { share_classes } from './Share.js';

function Finish({ allow_try_again, allow_share, share_buttons, setAllowTryAgain, setAllowShare, toggleShareButton }) {
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
                            { Object.keys(share_classes).map(k => (
                                <CheckboxControl
                                    label={k[0].toUpperCase() + k.slice(1)}
                                    onChange={() => toggleShareButton(k)}
                                    checked={share_buttons.includes(k)}
                                />
                            ))}
                        </div>
                    </div>
                }
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getFinish(state);
export default connect(mapStateToProps, { setAllowTryAgain, setAllowShare, toggleShareButton })(Finish);
