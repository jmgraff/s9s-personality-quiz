import {v4 as uuidv4} from 'uuid';
import arrayMove from 'array-move';
import produce from 'immer';

const blank = (question_id) => ({ id: uuidv4(), question_id, title: '', image_url: '', result_id: '' });
const initialState = [ ];

const ADD_ANSWER = 'ADD_ANSWER';
const REMOVE_ANSWER = 'REMOVE_ANSWER';
const MOVE_ANSWER_UP = 'MOVE_ANSWER_UP';
const MOVE_ANSWER_DOWN = 'MOVE_ANSWER_DOWN';
const SET_ANSWER_TITLE = 'SET_ANSWER_TITLE';
const SET_ANSWER_IMAGE_URL = 'SET_ANSWER_IMAGE_URL';
const SET_ANSWER_RESULT_ID = 'SET_ANSWER_RESULT_ID';

//actions
export const add = (question_id) => ({ type: ADD_ANSWER, payload: { question_id } });
export const remove = id => ({ type: REMOVE_ANSWER, payload: { id } });
export const up = index => ({ type: MOVE_ANSWER_UP, payload: { index } });
export const down = index => ({ type: MOVE_ANSWER_DOWN, payload: { index } });
export const setTitle = (id, title) => ({ type: SET_ANSWER_TITLE, payload: { id, title } });
export const setImageURL = (id, imageURL) => ({ type: SET_ANSWER_IMAGE_URL, payload: { id, imageURL } });
export const setResultID = (id, resultID) => ({ type: SET_ANSWER_RESULT_ID, payload: { id, resultID } });

//selectors
export const getAnswers = ({questions, answers}, question_id) => answers.filter(a => a.question_id === question_id);

//reducer
export const answers = produce((draft, action) => {
    switch (action.type) {
        case ADD_ANSWER: {
            draft.push(blank(action.payload.question_id));
            break;
        }
        case REMOVE_ANSWER: {
            return draft.filter(a => a.id !== action.payload.id);
        }
        case SET_ANSWER_TITLE: {
            draft.find(a => a.id === action.payload.id).title = action.payload.title;
            break;
        }
        case MOVE_ANSWER_UP: {
            const {index} = action.payload;
            return arrayMove(draft, index, index - 1);
        }
        case MOVE_ANSWER_DOWN: {
            const {index} = action.payload;
            return arrayMove(draft, index, index + 1);
        }
        case SET_ANSWER_IMAGE_URL: {
            draft.find(a => a.id === action.payload.id).image_url = action.payload.imageURL;
            break;
        }
        case SET_ANSWER_RESULT_ID: {
            draft.find(a => a.id === action.payload.id).result_id = action.payload.resultID;
            console.log('result_id set to: ', action.payload.resultID);
            break;
        }
        default:
            return;
    }
}, initialState);
