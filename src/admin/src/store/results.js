import {v4 as uuidv4} from 'uuid';
import produce from 'immer';

const blank = () => ({ id: uuidv4(), title: '', description: '', image_url: '' });
const initialState = [ blank() ];

const ADD_RESULT = 'ADD_RESULT';
const REMOVE_RESULT = 'REMOVE_RESULT';
const SET_RESULT_TITLE = 'SET_RESULT_TITLE';
const SET_RESULT_DESCRIPTION = 'SET_RESULT_DESCRIPTION';
const SET_RESULT_IMAGE_URL = 'SET_RESULT_IMAGE_URL';

//actions
export const add = (question_id) => ({ type: ADD_RESULT, payload: { question_id } });
export const remove = id => ({ type: REMOVE_RESULT, payload: { id } });
export const setTitle = (id, title) => ({ type: SET_RESULT_TITLE, payload: { id, title } });
export const setDescription = (id, description) => ({ type: SET_RESULT_DESCRIPTION, payload: { id, description } });
export const setImageURL = (id, imageURL) => ({ type: SET_RESULT_IMAGE_URL, payload: { id, imageURL } });

//selectors
export const getResults = ({results}) => results;

//reducer
export const results = produce((draft, action) => {
    switch (action.type) {
        case ADD_RESULT:
            draft.push(blank());
            break;
        case REMOVE_RESULT:
            return draft.filter(r => r.id !== action.payload.id);
        case SET_RESULT_TITLE:
            draft.find(r => r.id === action.payload.id).title = action.payload.title;
            break;
        case SET_RESULT_DESCRIPTION:
            draft.find(r => r.id === action.payload.id).description = action.payload.description;
            break;
        case SET_RESULT_IMAGE_URL:
            draft.find(r => r.id === action.payload.id).image_url = action.payload.image_url;
            break;
        default:
            return;
    }
}, initialState);
