import { emptyState } from 'app/emptyState';
import { actionTypes } from 'app/actions';

const appReducer = (state = emptyState, action) => {
    switch (action.type) {

      case actionTypes.TRIAL_ACTION:
        return state = {...state, trial: action.payload};

			case `${actionTypes.TRIAL_ASYNC_ACTION}/fulfilled`:
				return state = {...state, trialAsync: action.payload};

      case actionTypes.SELECT_COLOR:
        return state = {...state, canvas: {...state.canvas, selectedColor: action.payload}}

      case `${actionTypes.SUBMIT_DRAWING}/fulfilled`:
        return state = {...state, canvas: {...state.canvas, remoteImageData: action.payload}}

      default:
        return state;
    }
};

export default appReducer;