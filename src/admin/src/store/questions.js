import {v4 as uuidv4} from 'uuid';

/*
        answers: [
            {
                title: '',
                image_url: '',
                result_id: ''
            }
        ]
*/

const blankQuestion = () => ({ id: uuidv4(), title: '', image_url: '' });
const initialState = [ blankQuestion() ];

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
export function questions(state = initialState, action) {
    console.log(`in reducer, action=${action.type}`);
    let newState = undefined;

    switch (action.type) {

        case SET_QUESTION_TITLE:
            const { title } = action.payload;
            console.log(`Setting title to ${title}`);
            newState = state.map((question) => {
                if (question.id === action.payload.id) {
                    return { ...question, title }
                }
                return question;
            });
            console.log('newState: ', newState);
            return newState;

        case SET_QUESTION_IMAGE_URL:
            const { image_url } = action.payload;
            console.log(`Setting image URL to ${image_url}`);
            newState = state.map((question) => {
                if (question.id === action.payload.id) {
                    return { ...question, image_url }
                }
                return question;
            });
            console.log('newState: ', newState);
            return newState;

        case ADD_QUESTION:
            return [ ...state, blankQuestion() ];

        case REMOVE_QUESTION:
            return state.filter((question) => question.id !== action.payload.id)

        default:
            return state;
    }
}

