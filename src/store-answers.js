import {v4 as uuidv4} from 'uuid';
import { produce } from 'immer';

import { moveIndexLeft, moveIndexRight } from './store-utils.js';

const blank = (question_id, index) => ({ id: uuidv4(), question_id, title: '', image_url: '', result_id: '', index });
const initialState = [ ];

const ADD_ANSWER = 'ADD_ANSWER';
const REMOVE_ANSWER = 'REMOVE_ANSWER';
const MOVE_ANSWER_LEFT = 'MOVE_ANSWER_LEFT';
const MOVE_ANSWER_RIGHT = 'MOVE_ANSWER_RIGHT';
const SET_ANSWER_TITLE = 'SET_ANSWER_TITLE';
const SET_ANSWER_RESULT_ID = 'SET_ANSWER_RESULT_ID';

//actions
export const add = (question_id) => ({ type: ADD_ANSWER, payload: { question_id } });
export const remove = id => ({ type: REMOVE_ANSWER, payload: { id } });
export const moveLeft = id => ({ type: MOVE_ANSWER_LEFT, payload: { id } });
export const moveRight = id => ({ type: MOVE_ANSWER_RIGHT, payload: { id } });
export const setTitle = (id, title) => ({ type: SET_ANSWER_TITLE, payload: { id, title } });
export const setResultID = (id, resultID) => ({ type: SET_ANSWER_RESULT_ID, payload: { id, resultID } });

//selectors
export const getAnswers = ({questions, answers}, question_id) => {
    return answers.filter(a => a.question_id === question_id).sort((a,b) => a.index - b.index);
};

//reducer
export const answers = produce((draft, action) => {
    switch (action.type) {
        case ADD_ANSWER: {
            const newIndex = draft.filter(a => a.question_id == action.payload.question_id).length;
            draft.push(blank(action.payload.question_id, newIndex));
            break;
        }
        case REMOVE_ANSWER: {
            return draft.filter(a => a.id !== action.payload.id);
        }
        case SET_ANSWER_TITLE: {
            draft.find(a => a.id === action.payload.id).title = action.payload.title;
            break;
        }
        case MOVE_ANSWER_LEFT: {
            const answer = draft.find(a => a.id == action.payload.id);
            moveIndexLeft(draft.filter(a => a.question_id == answer.question_id), answer.id);
            break;
        }
        case MOVE_ANSWER_RIGHT: {
            const answer = draft.find(a => a.id == action.payload.id);
            moveIndexRight(draft.filter(a => a.question_id == answer.question_id), answer.id);
            break;
        }
        case SET_ANSWER_RESULT_ID: {
            draft.find(a => a.id === action.payload.id).result_id = action.payload.resultID;
            break;
        }
        default:
            return;
    }
}, initialState);
