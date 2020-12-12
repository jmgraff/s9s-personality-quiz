import produce from 'immer';

const initialState = {
    allow_try_again: true,
    share: {
        allow: false,
        force: false,
        title: 'I got {title}... what did you get?',
        description: '{description}',
        hashtags: '',
        buttons: [
            'facebook',
            'twitter',
            'pinterest',
            'reddit',
            'whatsapp',
            'telegram',
            'tumblr',
            'email',
        ]
    }
};

const SETTINGS_SET_ALLOW_TRY_AGAIN = 'SETTINGS_SET_ALLOW_TRY_AGAIN';
const SETTINGS_SET_ALLOW_SHARE = 'SETTINGS_SET_ALLOW_SHARE';
const SETTINGS_TOGGLE_SHARE_BUTTON = 'SETTINGS_TOGGLE_SHARE_BUTTON';
const SETTINGS_SET_SHARE_TITLE = 'SETTINGS_SET_SHARE_TITLE';
const SETTINGS_SET_SHARE_DESCRIPTION = 'SETTINGS_SET_SHARE_DESCRIPTION';
const SETTINGS_SET_SHARE_HASHTAGS = 'SETTINGS_SET_SHARE_HASHTAGS';
const SETTINGS_SET_FORCE_SHARE = 'SETTINGS_SET_FORCE_SHARE';

//actions
export const setAllowTryAgain = (allow_try_again) => ({ type: SETTINGS_SET_ALLOW_TRY_AGAIN, payload: { allow_try_again } });
export const setAllowShare = (allow_share) => ({ type: SETTINGS_SET_ALLOW_SHARE, payload: { allow_share } });
export const toggleShareButton = (share_button_id) => ({ type: SETTINGS_TOGGLE_SHARE_BUTTON, payload: { share_button_id } });
export const setShareTitle = (share_title) => ({ type: SETTINGS_SET_SHARE_TITLE, payload: { share_title } });
export const setShareDescription = (share_description) => ({ type: SETTINGS_SET_SHARE_DESCRIPTION, payload: { share_description } });
export const setShareHashtags = (share_hashtags) => ({ type: SETTINGS_SET_SHARE_HASHTAGS, payload: { share_hashtags } });
export const setForceShare = (force_share) => ({ type: SETTINGS_SET_FORCE_SHARE, payload: { force_share } });

//selectors
export const getSettings = ({settings}) => settings;
export const getShareSettings = ({settings}) => settings.share;

//reducer
export const settings = produce((draft, action) => {
    switch (action.type) {
        case SETTINGS_SET_ALLOW_TRY_AGAIN: {
            draft.allow_try_again = action.payload.allow_try_again;
            break;
        }
        case SETTINGS_SET_ALLOW_SHARE: {
            draft.share.allow = action.payload.allow_share;
            break;
        }
        case SETTINGS_SET_SHARE_TITLE: {
            draft.share.title = action.payload.share_title;
            break;
        }
        case SETTINGS_SET_SHARE_DESCRIPTION: {
            draft.share.description = action.payload.share_description;
            break;
        }
        case SETTINGS_SET_SHARE_HASHTAGS: {
            draft.share.hashtags = action.payload.share_hashtags;
            break;
        }
        case SETTINGS_TOGGLE_SHARE_BUTTON: {
            if (draft.share.buttons.includes(action.payload.share_button_id)) {
                let index = draft.share.buttons.findIndex(ii => ii === action.payload.share_button_id);
                draft.share.buttons.splice(index, 1);
                break;
            } else {
                draft.share.buttons.push(action.payload.share_button_id);
                break;
            }
        }
        case SETTINGS_SET_FORCE_SHARE: {
            draft.share.force = action.payload.force_share;
            break;
        }
        default:
            return;
    }

}, initialState);
