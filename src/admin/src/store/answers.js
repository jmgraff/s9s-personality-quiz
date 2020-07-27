import {v4 as uuidv4} from 'uuid';
import produce from 'immer';

const blank = (question_id) => ({ id: uuidv4(), question_id, title: '', image_url: '', result_id: '' });
const initialState = [ ];

const ADD_ANSWER = 'ADD_ANSWER';
const REMOVE_ANSWER = 'REMOVE_ANSWER';
const SET_ANSWER_TITLE = 'SET_ANSWER_TITLE';
const SET_ANSWER_IMAGE_URL = 'SET_ANSWER_IMAGE_URL';
const SET_ANSWER_RESULT_ID = 'SET_ANSWER_RESULT_ID';

//actions
export const add = (question_id) => ({ type: ADD_ANSWER, payload: { question_id } }) ;
export const remove = id => ({ type: REMOVE_ANSWER, payload: { id } });
export const setTitle = (id, title) => ({ type: SET_ANSWER_TITLE, payload: { id, title } });
export const setImageURL = (id, imageURL) => ({ type: SET_ANSWER_IMAGE_URL, payload: { id, imageURL } });
export const setResultID = (id, resultID) => ({ type: SET_ANSWER_RESULT_ID, payload: { id, resultID } });

//selectors
export const getAnswers = ({questions, answers}, question_id) => {
    return answers.filter(a => a.question_id === question_id);
}

export const answers = produce((draft, action) => {
    switch (action.type) {
        case ADD_ANSWER:
            draft.push(blank(action.question_id));
            return draft;
        case REMOVE_ANSWER:
            return draft.filter(a => a.id !== action.payload.id);
        case SET_ANSWER_TITLE:
            draft.find(a => a.id === action.payload.id).title = action.payload.title;
            break;
        case SET_ANSWER_IMAGE_URL:
            draft.find(a => a.id === action.payload.id).image_url = action.payload.image_url;
            break;
        case SET_ANSWER_RESULT_ID:
            draft.find(a => a.id === action.payload.id).result_id = action.payload.result_id;
            break;
        default:
            return initialState;
    }
});
