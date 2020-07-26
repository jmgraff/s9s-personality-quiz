const initialState = {
        title: '',
        description: '',
        image_url: '',
}

const SET_TITLE = 'SET_TITLE';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SET_IMAGE_URL = 'SET_IMAGE_URL';

//actions
export const setTitle = title => ({ type: SET_TITLE, payload: { title } });
export const setDescription = description => ({ type: SET_DESCRIPTION, payload: { description } });
export const setImageURL = imageURL => ({ type: SET_IMAGE_URL, payload: { imageURL } });

//selectors
export const getIntro = ({intro}) => {
    console.log("Getting intro", intro);
    return intro;
}

//reducer
export function intro(state = initialState, action) {
    console.log(`in reducer, action=${action.type}`);
    switch (action.type) {
        case SET_TITLE:
            const { title } = action.payload;
            console.log(`Setting title to ${title}`);
            return {...state, title};
        case SET_DESCRIPTION:
            const { description } = action.payload;
            console.log(`Setting description to ${description}`);
            return {...state, description };
        case SET_IMAGE_URL:
            const { image_url } = action.payload;
            console.log(`Setting image URL to ${image_url}`);
            return { ...state, image_url };
        default:
            return state;
    }
}

