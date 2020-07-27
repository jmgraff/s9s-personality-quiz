import {v4 as uuidv4} from 'uuid';
import produce from 'immer';

const blank = () => ({ id: uuidv4(), title: '', image_url: '' });
const initialState = [ blank() ];

const ADD_QUESTION = 'ADD_QUESTION';
const REMOVE_QUESTION = 'REMOVE_QUESTION';
const SET_QUESTION_TITLE = 'SET_QUESTION_TITLE';
const SET_QUESTION_IMAGE_URL = 'SET_QUESTION_IMAGE_URL';

//actions
export const setTitle = (id, title) => ({ type: SET_QUESTION_TITLE, payload: { id, title } });
export const setImageURL = (id, imageURL) => ({ type: SET_QUESTION_IMAGE_URL, payload: { id, imageURL } });
export const add = () => ({ type: ADD_QUESTION }) ;
export const remove = id => ({ type: REMOVE_QUESTION, payload: { id } });

//selectors
export const getQuestions = ({questions}) => {
    console.log("questions: ", questions);
    return questions;
}

//reducer
export const questions = produce((draft, action) => {
    switch (action.type) {
        case SET_QUESTION_TITLE:
            const { title } = action.payload;
            draft.find(q => q.id === action.payload.id).title = title;
            return draft;

        case SET_QUESTION_IMAGE_URL:
            const { image_url } = action.payload;
            draft.find(q => q.id === action.payload.id).image_url = image_url;
            return draft;

        case ADD_QUESTION:
            draft.push(blank());
            return draft;

        case REMOVE_QUESTION:
            return draft.filter(q => q.id !== action.payload.id);

        default:
            return initialState;
    }
});
