const { Button, ToggleControl, TextControl, TextareaControl, CheckboxControl } = wp.components;
import { connect } from 'react-redux';
import { getShareSettings, setShareTitle, setAllowShare, toggleShareButton,
    setShareDescription, setShareHashtags, setForceShare, setShareVia } from './store-settings.js';
import { share_classes } from './Share.js';

function ShareSettings(props) {
    const {
        buttons,
        force,
        setForceShare,
        hashtags,
        setShareHashtags,
        allow,
        setAllowShare,
        title,
        setShareTitle,
        description,
        shareDescription,
        setShareDescription,
        via,
        setShareVia,
        toggleShareButton,
    } = props;

    const ShareCheckbox = ({id}) => (
        <CheckboxControl
            label={share_classes[id].name}
            onChange={() => toggleShareButton(id)}
            checked={buttons.includes(id)}
        />
    );

    const ShareCheckboxes = ({keys}) => keys.map(k => <ShareCheckbox id={k} />);

    const shareKeys = Object.keys(share_classes);
    const firstHalf = shareKeys.slice(0, Math.ceil(shareKeys.length / 2));
    const secondHalf = shareKeys.slice(firstHalf.length, shareKeys.length);

    return (
        <>
            <ToggleControl
                label='Share buttons'
                help={ allow ? 'Visible': 'Hidden' }
                checked={ allow }
                onChange={ () => setAllowShare(!allow) }
            />

            { allow &&
                <>
                    <ToggleControl
                        label='Force share'
                        help={ force ? 'User must share to see results': 'User can see results without sharing' }
                        checked={ force }
                        onChange={ () => setForceShare(!force) }
                    />
                    <TextControl
                        label="Share Title"
                        onChange={ val => setShareTitle(val) }
                        value={ title }
                        help="Use {title} to use the title of the quiz result"
                    />
                    <TextareaControl
                        label="Share Description"
                        onChange={ setShareDescription }
                        value={ description }
                        help="Applies to Instapaper, LinkedIn, Livejournal, Mail.ru, OK, Pinterest, Tumblr, Workplace, and Email. Use {description} to use the description of the quiz result."
                    />
                    <TextControl
                        label='Shared "via"'
                        onChange={ setShareVia }
                        value={ via }
                        help={"Applies to Twitter only. Should be a URL."}
                    />
                    <TextControl
                        label="Hashtags"
                        onChange={ setShareHashtags }
                        value={ hashtags }
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
            }
        </>
    );
}

function FreeShareSettings(props) {
    const premiumLink = "http://www.google.com";
    const PremiumButton = () => (
        <center>
            <Button as="a" isPrimary href={premiumLink} target="blank">
                Click Here to Get PREMIUM Now!
            </Button>
        </center>
    );
    return (
        <>
            <h5>Want users to share this quiz?</h5>
            <p><a href={premiumLink} target="blank">Get Personality Quiz PREMIUM</a> for access to...</p>
            <ul>
                <li>21 different <b>social media share buttons</b></li>
                <li><b>Require</b> users to share the quiz before seeing the result</li>
                <li>Customizable, templat-able sharing messages</li>
                <li>
                    Upcoming PREMIUM features like
                    <ul>
                        <li>Email marketing service integration</li>
                        <li>Customizable call-to-action for sharing</li>
                        <li>Video questions</li>
                        <li>Image answers</li>
                        <li>And more!</li>
                    </ul>
                </li>
            </ul>
            <PremiumButton />
        </>
    );
}

let settingsComponent = undefined;

if (PREMIUM) {
    const mapStateToProps = (state) => getShareSettings(state);
    settingsComponent = connect(mapStateToProps, { setShareTitle, setShareDescription, toggleShareButton,
        setShareHashtags, setForceShare, setAllowShare, setShareVia })(ShareSettings);
} else {
    settingsComponent = FreeShareSettings;
}

export default settingsComponent;
