import { ToggleControl, TextControl, TextareaControl, CheckboxControl } from '@wordpress/components';
import { connect } from 'react-redux';
import { getShareSettings, setShareTitle, setAllowShare,
    setShareDescription, setShareHashtags, setForceShare } from './store-settings.js';
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

const mapStateToProps = (state) => getShareSettings(state);
export default connect(mapStateToProps, { setShareTitle, setShareDescription, setShareHashtags, setForceShare, setAllowShare })(ShareSettings);
