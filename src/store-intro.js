import produce from 'immer';

const INTRO_SET_TITLE = 'INTRO_SET_TITLE';
const INTRO_SET_DESCRIPTION = 'INTRO_SET_DESCRIPTION';

const initialState = {
    title: '',
    description: ''
}

//actions
export const setIntroTitle = (title) => ({ type: INTRO_SET_TITLE, payload: { title } });
export const setIntroDescription = (description) => ({ type: INTRO_SET_DESCRIPTION, payload: { description } });

//selectors
export const getIntro = ({intro}) => intro;

export const intro = produce((draft, action) => {
    switch (action.type) {
        case INTRO_SET_TITLE:
            draft.title = action.payload.title;
            break;
        case INTRO_SET_DESCRIPTION:
            draft.description = action.payload.description;
            break;
        default:
            return;
    }
}, initialState);
