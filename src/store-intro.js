import produce from 'immer';

const INTRO_SET_TITLE = 'INTRO_SET_TITLE';
const INTRO_SET_DESCRIPTION = 'INTRO_SET_DESCRIPTION';
const INTRO_SET_IMAGE_URL = 'INTRO_SET_IMAGE_URL';

const initialState = {
    title: '',
    description: '',
    image_url: ''
}

//actions
export const setIntroTitle = (title) => ({ type: INTRO_SET_TITLE, payload: { title } });
export const setIntroDescription = (description) => ({ type: INTRO_SET_DESCRIPTION, payload: { description } });
export const setImageURL = (imageURL) => ({ type: INTRO_SET_IMAGE_URL, payload: { imageURL } });

//selectors
export const getIntro = ({intro}) => intro;

export const intro = produce((draft, action) => {
    switch (action.type) {
        case INTRO_SET_TITLE: {
            draft.title = action.payload.title;
            break;
        }
        case INTRO_SET_DESCRIPTION: {
            draft.description = action.payload.description;
            break;
        }
        case INTRO_SET_IMAGE_URL: {
            draft.image_url = action.payload.imageURL;
            break;
        }
        default:
            return;
    }
}, initialState);
