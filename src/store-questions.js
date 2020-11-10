import {v4 as uuidv4} from 'uuid';
import { produce } from 'immer';

import { moveIndexLeft, moveIndexRight } from './store-utils.js';
import { removeQuestionAnswers } from './store-answers.js';

const blank = (index) => ({ id: uuidv4(), title: '', image_url: '', index});
const initialState = [ blank(0) ];

const ADD_QUESTION = 'ADD_QUESTION';
const REMOVE_QUESTION = 'REMOVE_QUESTION';
const MOVE_QUESTION_LEFT = 'MOVE_QUESTION_LEFT';
const MOVE_QUESTION_RIGHT = 'MOVE_QUESTION_RIGHT';
const SET_QUESTION_TITLE = 'SET_QUESTION_TITLE';
const SET_QUESTION_IMAGE_URL = 'SET_QUESTION_IMAGE_URL';

//actions
export const setTitle = (id, title) => ({ type: SET_QUESTION_TITLE, payload: { id, title } });
export const setImageURL = (id, image_url) => ({ type: SET_QUESTION_IMAGE_URL, payload: { id, image_url } });
export const add = () => ({ type: ADD_QUESTION }) ;
export const remove = id => ({ type: REMOVE_QUESTION, payload: { id } });
export const moveLeft = id => ({type: MOVE_QUESTION_LEFT, payload: { id }});
export const moveRight = id => ({type: MOVE_QUESTION_RIGHT, payload: { id }});

//selectors
export const getQuestions = ({questions}) => [...questions].sort((a,b) => a.index - b.index);

//reducer
export const questions = produce((draft, action) => {

    switch (action.type) {
        case ADD_QUESTION: {
            draft.push(blank(draft.length));
            break;
        }
        case REMOVE_QUESTION: {
            return draft.filter(q => q.id !== action.payload.id);
        }
        case MOVE_QUESTION_LEFT: {
            moveIndexLeft(draft, action.payload.id);
            break;
        }
        case MOVE_QUESTION_RIGHT: {
            moveIndexRight(draft, action.payload.id);
            break;
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
