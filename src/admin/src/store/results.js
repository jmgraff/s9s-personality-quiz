import {v4 as uuidv4} from 'uuid';
import produce from 'immer';

const blank = () => ({ id: uuidv4(), title: '', description: '', image_url: '' });
const initialState = [ ];

const ADD_RESULT = 'ADD_RESULT';
const REMOVE_RESULT = 'REMOVE_RESULT';
const SET_RESULT_TITLE = 'SET_RESULT_TITLE';
const SET_RESULT_DESCRIPTION = 'SET_RESULT_DESCRIPTION';
const SET_RESULT_IMAGE_URL = 'SET_RESULT_IMAGE_URL';

//actions
export const add = (question_id) => ({ type: ADD_RESULT, payload: { question_id } });
export const remove = id => ({ type: REMOVE_ANSWER, payload: { id } });
export const setTitle = (id, title) => ({ type: SET_RESULT_TITLE, payload: { id, title } });
export const setTitle = (id, description) => ({ type: SET_RESULT_DESCRIPTION, payload: { id, description } });
export const setImageURL = (id, imageURL) => ({ type: SET_RESULT_IMAGE_URL, payload: { id, imageURL } });
export const setResultID = (id, resultID) => ({ type: SET_RESULT_RESULT_ID, payload: { id, resultID } });

//selectors
export const getResults = ({results}) => results;

export const results = produce((draft, action) => {
    switch (action.type) {
        case ADD_RESULT:
            draft.push(blank(action.payload.question_id));
            break;
        case REMOVE_RESULT:
            return draft.filter(a => a.id !== action.payload.id);
        case SET_RESULT_TITLE:
            draft.find(a => a.id === action.payload.id).title = action.payload.title;
            break;
        case SET_RESULT_IMAGE_URL:
            draft.find(a => a.id === action.payload.id).image_url = action.payload.image_url;
            break;
        case SET_RESULT_RESULT_ID:
            draft.find(a => a.id === action.payload.id).result_id = action.payload.result_id;
            break;
    }
}, initialState);
