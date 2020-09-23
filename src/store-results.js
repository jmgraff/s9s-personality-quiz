import {v4 as uuidv4} from 'uuid';
import produce from 'immer';

const blank = () => ({ id: uuidv4(), title: '', description: '', image_url: '' });
const initialState = [ blank() ];

const RESULT_ADD = 'RESULT_ADD';
const RESULT_REMOVE = 'RESULT_REMOVE';
const RESULT_SET_TITLE = 'RESULT_SET_TITLE';
const RESULT_SET_DESCRIPTION = 'RESULT_SET_DESCRIPTION';
const RESULT_SET_IMAGE_URL = 'RESULT_SET_IMAGE_URL';

//actions
export const add = (question_id) => ({ type: RESULT_ADD, payload: { question_id } });
export const remove = id => ({ type: RESULT_REMOVE, payload: { id } });
export const setTitle = (id, title) => ({ type: RESULT_SET_TITLE, payload: { id, title } });
export const setDescription = (id, description) => ({ type: RESULT_SET_DESCRIPTION, payload: { id, description } });
export const setImageURL = (id, imageURL) => ({ type: RESULT_SET_IMAGE_URL, payload: { id, imageURL } });

//selectors
export const getResults = ({results}) => results;

//reducer
export const results = produce((draft, action) => {
    switch (action.type) {
        case RESULT_ADD:
            draft.push(blank());
            break;
        case RESULT_REMOVE:
            return draft.filter(r => r.id !== action.payload.id);
        case RESULT_SET_TITLE:
            draft.find(r => r.id === action.payload.id).title = action.payload.title;
            break;
        case RESULT_SET_DESCRIPTION:
            draft.find(r => r.id === action.payload.id).description = action.payload.description;
            break;
        case RESULT_SET_IMAGE_URL:
            draft.find(r => r.id === action.payload.id).image_url = action.payload.image_url;
            break;
        default:
            return;
    }
}, initialState);
