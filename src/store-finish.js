import produce from 'immer';

const initialState = {
    allow_try_again: true
};

const FINISH_SET_ALLOW_TRY_AGAIN = 'FINISH_SET_ALLOW_TRY_AGAIN';

//actions
export const setAllowTryAgain = (allow_try_again) => ({ type: FINISH_SET_ALLOW_TRY_AGAIN, payload: { allow_try_again } });

//selectors
export const getFinish = ({finish}) => finish;

//reducer
export const finish = produce((draft, action) => {
    switch (action.type) {
        case FINISH_SET_ALLOW_TRY_AGAIN: {
            console.log("Store: produce called; Setting allow_try_again to: ", action.payload.allow_try_again);
            draft.allow_try_again = action.payload.allow_try_again;
            break;
        }
        default:
            return;
    }
}, initialState);
