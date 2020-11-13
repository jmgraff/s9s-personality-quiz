import produce from 'immer';

const initialState = {
    allow_try_again: true,
    allow_share: false,
    share_title: 'I got {title}... what did you get?',
    share_description: '{description}',
    share_hashtags: '',
    share_buttons: [
        'facebook',
        'twitter',
        'pinterest',
        'reddit',
        'whatsapp',
        'telegram',
        'tumblr',
        'email',
    ]
};

const FINISH_SET_ALLOW_TRY_AGAIN = 'FINISH_SET_ALLOW_TRY_AGAIN';
const FINISH_SET_ALLOW_SHARE = 'FINISH_SET_ALLOW_SHARE';
const FINISH_TOGGLE_SHARE_BUTTON = 'FINISH_TOGGLE_SHARE_BUTTON';
const FINISH_SET_SHARE_TITLE = 'FINISH_SET_SHARE_TITLE';
const FINISH_SET_SHARE_DESCRIPTION = 'FINISH_SET_SHARE_DESCRIPTION';
const FINISH_SET_SHARE_HASHTAGS = 'FINISH_SET_SHARE_HASHTAGS';

//actions
export const setAllowTryAgain = (allow_try_again) => ({ type: FINISH_SET_ALLOW_TRY_AGAIN, payload: { allow_try_again } });
export const setAllowShare = (allow_share) => ({ type: FINISH_SET_ALLOW_SHARE, payload: { allow_share } });
export const toggleShareButton = (share_button_id) => ({ type: FINISH_TOGGLE_SHARE_BUTTON, payload: { share_button_id } });
export const setShareTitle = (share_title) => ({ type: FINISH_SET_SHARE_TITLE, payload: { share_title } });
export const setShareDescription = (share_description) => ({ type: FINISH_SET_SHARE_DESCRIPTION, payload: { share_description } });
export const setShareHashtags = (share_hashtags) => ({ type: FINISH_SET_SHARE_HASHTAGS, payload: { share_hashtags } });

//selectors
export const getFinish = ({finish}) => finish;

//reducer
export const finish = produce((draft, action) => {
    switch (action.type) {
        case FINISH_SET_ALLOW_TRY_AGAIN: {
            draft.allow_try_again = action.payload.allow_try_again;
            break;
        }
        case FINISH_SET_ALLOW_SHARE: {
            draft.allow_share = action.payload.allow_share;
            break;
        }
        case FINISH_SET_SHARE_TITLE: {
            draft.share_title = action.payload.share_title;
            break;
        }
        case FINISH_SET_SHARE_DESCRIPTION: {
            draft.share_description = action.payload.share_description;
            break;
        }
        case FINISH_SET_SHARE_HASHTAGS: {
            draft.share_hashtags = action.payload.share_hashtags;
            break;
        }
        case FINISH_TOGGLE_SHARE_BUTTON: {
            if (draft.share_buttons.includes(action.payload.share_button_id)) {
                let index = draft.share_buttons.findIndex(ii => ii === action.payload.share_button_id);
                draft.share_buttons.splice(index, 1);
                break;
            } else {
                draft.share_buttons.push(action.payload.share_button_id);
                break;
            }
        }
        default:
            return;
    }

}, initialState);
