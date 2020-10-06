import {v4 as uuidv4} from 'uuid';
import arrayMove from 'array-move';
import produce from 'immer';

const blank = (index) => ({ id: uuidv4(), title: '', image_url: '', index});
const initialState = [ blank(0) ];

const ADD_QUESTION = 'ADD_QUESTION';
const SET_INDEX = 'SET_INDEX';
const REMOVE_QUESTION = 'REMOVE_QUESTION';
const SET_QUESTION_TITLE = 'SET_QUESTION_TITLE';
const SET_QUESTION_IMAGE_URL = 'SET_QUESTION_IMAGE_URL';

//actions
export const setTitle = (id, title) => ({ type: SET_QUESTION_TITLE, payload: { id, title } });
export const setImageURL = (id, image_url) => ({ type: SET_QUESTION_IMAGE_URL, payload: { id, image_url } });
export const add = () => ({ type: ADD_QUESTION }) ;
export const remove = id => ({ type: REMOVE_QUESTION, payload: { id } });
export const setIndex = (id, index) => ({type: SET_INDEX, payload: { id, index }});

//selectors
export const getQuestions = ({questions}) => questions;

//reducer
export const questions = produce((draft, action) => {
    switch (action.type) {
        case ADD_QUESTION: {
            const blankQuestion = blank(draft.length);
            draft.push(blankQuestion);
            console.log('Added new question: ', blankQuestion);
            break;
        }
        case SET_INDEX: {
            console.log("Store: Setting index from ", draft.find(q => q.id == action.payload.id).index, " to ", action.payload.index);
            draft.find(q => q.id == action.payload.id).index = action.payload.index;
            break;
        }
        case REMOVE_QUESTION: {
            return draft.filter(q => q.id !== action.payload.id);
        }
        case SET_QUESTION_TITLE: {
            draft.find(q => q.id === action.payload.id).title = action.payload.title;
            break;
        }
        case SET_QUESTION_IMAGE_URL: {
            draft.find(q => q.id === action.payload.id).image_url = action.payload.image_url;
            break;
        }
        default:
            return;
    }
}, initialState);
