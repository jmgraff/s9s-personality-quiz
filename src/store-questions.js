import {v4 as uuidv4} from 'uuid';
import arrayMove from 'array-move';
import produce from 'immer';

const blank = () => ({ id: uuidv4(), title: '', image_url: '' });
const initialState = [ blank() ];

const ADD_QUESTION = 'ADD_QUESTION';
const REMOVE_QUESTION = 'REMOVE_QUESTION';
const MOVE_QUESTION_UP = 'MOVE_QUESTION_UP';
const MOVE_QUESTION_DOWN = 'MOVE_QUESTION_DOWN';
const SET_QUESTION_TITLE = 'SET_QUESTION_TITLE';
const SET_QUESTION_IMAGE_URL = 'SET_QUESTION_IMAGE_URL';

//actions
export const setTitle = (id, title) => ({ type: SET_QUESTION_TITLE, payload: { id, title } });
export const setImageURL = (id, image_url) => ({ type: SET_QUESTION_IMAGE_URL, payload: { id, image_url } });
export const add = () => ({ type: ADD_QUESTION }) ;
export const remove = id => ({ type: REMOVE_QUESTION, payload: { id } });
export const up = index => ({ type: MOVE_QUESTION_UP, payload: { index } });
export const down = index => ({ type: MOVE_QUESTION_DOWN, payload: { index } });

//selectors
export const getQuestions = ({questions}) => questions;

//reducer
export const questions = produce((draft, action) => {
    switch (action.type) {
        case ADD_QUESTION: {
            draft.push(blank());
            break;
        }
        case REMOVE_QUESTION: {
            return draft.filter(q => q.id !== action.payload.id);
        }
        case MOVE_QUESTION_UP: {
            const {index} = action.payload;
            return arrayMove(draft, index, index - 1);
        }
        case MOVE_QUESTION_DOWN: {
            const {index} = action.payload;
            return arrayMove(draft, index, index + 1);
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
