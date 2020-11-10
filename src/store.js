import { createStore, combineReducers, applyMiddleware } from 'redux';
import produce from 'immer';
import { useState } from 'react';
import { debounce } from 'lodash';

import { intro } from './store-intro.js';
import { results } from './store-results.js';
import { questions } from './store-questions.js';
import { answers } from './store-answers.js';
import { finish } from './store-finish.js';


const combined = combineReducers({intro, results, questions, answers, finish});

export const getNewTestStore = (testData) => createStore(combined, testData)

export const getNewStore = (data, saveCallback) => {
    const debounceSave = debounce(() => saveCallback(), 500);

    const debounceSaveMiddleware = store => next => action => {
        const returnValue = next(action);
        debounceSave();
        return returnValue;
    }

    if (DEBUG) {
        data ||= '{"intro":{"title":"Color Quiz","description":"Find out which color you are with this quiz","image_url":"https://i.imgur.com/UoUyGR3.jpg"},"results":[{"id":"ae1aa774-7b84-43a6-95ad-9351165855f8","title":"Red","description":"You are the color red","image_url":"https://i.imgur.com/C3Soq7B.jpeg"},{"id":"b70c6148-850c-46ef-aff1-bae79cf9bf9b","title":"Orange","description":"You are the color orange","image_url":"https://i.imgur.com/6Jd798C.jpeg"},{"id":"81db3518-eec4-4073-acb1-30d4e0cc8a83","title":"Yellow","description":"You are the color yellow","image_url":"https://i.imgur.com/eQueRtf.jpg"},{"id":"cd9d735d-866d-4959-ba9a-f262c4c01171","title":"Green","description":"You are the color green","image_url":"https://i.imgur.com/bsCPi0f.jpeg"}],"questions":[{"id":"01e078fb-4edb-4622-89ef-235107d0e8d5","title":"What is your favorite fruit?","image_url":"https://i.imgur.com/SAwpBlO.jpg","index":0},{"id":"c8018d49-2c88-4f52-8144-9c3c47e726ea","title":"Which of these do you like best?","image_url":"https://i.imgur.com/VDSFO47.png","index":1},{"id":"f08fb44b-2f2b-41b0-8c76-5fb58b389628","title":"What is your favorite vegetable?","image_url":"https://i.imgur.com/hUTKRM3.jpg","index":2}],"answers":[{"id":"b8f83c76-d45a-4e8d-8f8d-ad0cbdfa7643","question_id":"01e078fb-4edb-4622-89ef-235107d0e8d5","title":"Strawberry","image_url":"","result_id":"ae1aa774-7b84-43a6-95ad-9351165855f8","index":0},{"id":"8adf5620-8208-468f-8dbf-2850e0256b7a","question_id":"01e078fb-4edb-4622-89ef-235107d0e8d5","title":"Orange","image_url":"","result_id":"b70c6148-850c-46ef-aff1-bae79cf9bf9b","index":1},{"id":"1e767dc2-4f27-4f6a-bf1e-217ae44089ae","question_id":"01e078fb-4edb-4622-89ef-235107d0e8d5","title":"Banana","image_url":"","result_id":"81db3518-eec4-4073-acb1-30d4e0cc8a83","index":2},{"id":"5aa07706-eaf6-40ca-b997-60f5998307a5","question_id":"01e078fb-4edb-4622-89ef-235107d0e8d5","title":"Kiwi","image_url":"","result_id":"cd9d735d-866d-4959-ba9a-f262c4c01171","index":3},{"id":"e0ca64c9-dbfb-46cb-93e8-8171e775bbd3","question_id":"c8018d49-2c88-4f52-8144-9c3c47e726ea","title":"Firetrucks","image_url":"","result_id":"ae1aa774-7b84-43a6-95ad-9351165855f8","index":0},{"id":"0f06f5a2-5e72-4447-88d0-86f5e235061a","question_id":"c8018d49-2c88-4f52-8144-9c3c47e726ea","title":"Sunsets","image_url":"","result_id":"b70c6148-850c-46ef-aff1-bae79cf9bf9b","index":1},{"id":"6f4bb49c-912f-41e5-bac3-27ea788a050e","question_id":"c8018d49-2c88-4f52-8144-9c3c47e726ea","title":"Sunflowers","image_url":"","result_id":"81db3518-eec4-4073-acb1-30d4e0cc8a83","index":2},{"id":"c7f4b79c-b23e-4e04-9e76-b82eb39efdb0","question_id":"c8018d49-2c88-4f52-8144-9c3c47e726ea","title":"Trees","image_url":"","result_id":"cd9d735d-866d-4959-ba9a-f262c4c01171","index":3},{"id":"039bed26-b0e6-4709-bb60-1a68a96b94b8","question_id":"f08fb44b-2f2b-41b0-8c76-5fb58b389628","title":"Tomato","image_url":"","result_id":"ae1aa774-7b84-43a6-95ad-9351165855f8","index":0},{"id":"afbdf1bb-4c2f-455c-a38f-e3bc9a391abc","question_id":"f08fb44b-2f2b-41b0-8c76-5fb58b389628","title":"Carrot","image_url":"","result_id":"b70c6148-850c-46ef-aff1-bae79cf9bf9b","index":1},{"id":"ec70d26f-3f2d-4dd6-85d7-b36862b21bfd","question_id":"f08fb44b-2f2b-41b0-8c76-5fb58b389628","title":"Corn","image_url":"","result_id":"81db3518-eec4-4073-acb1-30d4e0cc8a83","index":2},{"id":"ea6cef9b-3e79-444f-b4f2-10740c570948","question_id":"f08fb44b-2f2b-41b0-8c76-5fb58b389628","title":"String Beans","image_url":"","result_id":"cd9d735d-866d-4959-ba9a-f262c4c01171","index":3}]}';
    }

    const [store, setStore] = useState(createStore(combined, data ? JSON.parse(data) : undefined, applyMiddleware(debounceSaveMiddleware)));

    return store;
}


