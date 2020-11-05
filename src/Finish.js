import { Card, CardBody, ToggleControl } from '@wordpress/components'; //FIXME what is component for bool? Switch?
import { connect } from 'react-redux';

import { setAllowTryAgain, getFinish } from './store-finish.js';

function Finish({ allow_try_again, setAllowTryAgain }) {
    return (
        <Card>
            <CardBody>
                <ToggleControl
                    label='Show "try again" button'
                    help={ allow_try_again ? 'User can re-take quiz' : 'User cannot re-take quiz' }
                    checked={ allow_try_again }
                    onChange={ () => setAllowTryAgain(!allow_try_again) }
                />
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getFinish(state);
export default connect(mapStateToProps, { setAllowTryAgain })(Finish);
