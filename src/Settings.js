import { Card, CardBody, ToggleControl, CheckboxControl, TextControl, TextareaControl } from '@wordpress/components';
import { connect } from 'react-redux';

import { setAllowTryAgain, setAllowShare, getSettings, toggleShareButton, setShareTitle,
    setShareDescription, setShareHashtags, setForceShare } from './store-settings.js';
import { share_classes } from './Share.js';

//TODO move this to Share.js and connect to store
function Share(props) {
    const {
        toggleShareButton,
        forceShare,
        shareButtons,
        shareTitle,
        setShareTitle,
        shareDescription,
        setShareDescription,
        shareHashtags,
        setShareHashtags,
        setForceShare
    } = props;

    const ShareCheckbox = ({id}) => (
        <CheckboxControl
            label={share_classes[id].name}
            onChange={() => toggleShareButton(id)}
            checked={shareButtons.includes(id)}
        />
    );

    const ShareCheckboxes = ({keys}) => keys.map(k => <ShareCheckbox id={k} />);

    const shareKeys = Object.keys(share_classes);
    const firstHalf = shareKeys.slice(0, Math.ceil(shareKeys.length / 2));
    const secondHalf = shareKeys.slice(firstHalf.length, shareKeys.length);

    return (
        <>
            <ToggleControl
                label='Force share'
                help={ forceShare ? 'User must share to see results': 'User can see results without sharing' }
                checked={ forceShare }
                onChange={ () => setForceShare(!forceShare) }
            />
            <TextControl
                label="Share Title"
                onChange={ val => setShareTitle(val) }
                value={ shareTitle }
                help="Use {title} to use the title of the quiz result"
            />
            <TextareaControl
                label="Share Description"
                onChange={ setShareDescription }
                value={ shareDescription }
                help="Applies to Instapaper, LinkedIn, Livejournal, Mail.ru, OK, Pinterest, Tumblr, Workplace, and Email. Use {description} to use the description of the quiz result."
            />
            <TextControl
                label="Hashtags"
                onChange={ setShareHashtags }
                value={ shareHashtags }
                help="Space-separated list of hashtags. Applies to Facebook, Tumblr, Twitter, and Workplace. Note: Facebook and Workplace only accept one hashtag; if multiple are supplied, only the first will be used."
            />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '50%' }}>
                    <ShareCheckboxes keys={firstHalf} />
                </div>
                <div style={{ flex: '50%' }}>
                    <ShareCheckboxes keys={secondHalf} />
                </div>
            </div>
        </>
    );
}

function Settings(props) {
    const {
        allow_try_again,
        allow_share,
        force_share,
        share_buttons,
        share_title,
        share_description,
        share_hashtags,
        setShareHashtags,
        setShareDescription,
        setAllowTryAgain,
        setAllowShare,
        toggleShareButton,
        setForceShare,
        setShareTitle
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
                <ToggleControl
                    label='Share buttons'
                    help={ allow_share ? 'Visible': 'Hidden' }
                    checked={ allow_share }
                    onChange={ () => setAllowShare(!allow_share) }
                />
                { allow_share &&
                    <Share
                        toggleShareButton={toggleShareButton}
                        setForceShare={setForceShare}
                        forceShare={force_share}
                        shareButtons={share_buttons}
                        shareTitle={share_title}
                        shareHashtags={share_hashtags}
                        setShareHashtags={setShareHashtags}
                        setShareTitle={setShareTitle}
                        shareDescription={share_description}
                        setShareDescription={setShareDescription}
                    />
                }
            </CardBody>
        </Card>
    );
}

const mapStateToProps = (state) => getSettings(state);
export default connect(mapStateToProps, { setAllowTryAgain, setAllowShare, toggleShareButton, setShareTitle,
    setShareDescription, setShareHashtags, setForceShare })(Settings);
