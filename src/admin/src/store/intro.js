import produce from 'immer';

const initialState = {
        title: '',
        description: '',
        image_url: '',
}

const SET_INTRO_TITLE = 'SET_INTRO_TITLE';
const SET_INTRO_DESCRIPTION = 'SET_INTRO_DESCRIPTION';
const SET_INTRO_IMAGE_URL = 'SET_INTRO_IMAGE_URL';

//actions
export const setTitle = title => ({ type: SET_INTRO_TITLE, payload: { title } });
export const setDescription = description => ({ type: SET_INTRO_DESCRIPTION, payload: { description } });
export const setImageURL = imageURL => ({ type: SET_INTRO_IMAGE_URL, payload: { imageURL } });

//selectors
export const getIntro = ({intro}) => {
    console.log("Getting intro", intro);
    return intro;
}

//reducer
export const intro = produce((draft, action) => {
    switch (action.type) {
        case SET_INTRO_TITLE:
            draft.title = action.payload.title;
            break;
        case SET_INTRO_DESCRIPTION:
            draft.description = action.payload.description;
            break;
        case SET_INTRO_IMAGE_URL:
            draft.image_url = action.payload.image_url;
            break;
        default:
            return initialState;
    }
});
