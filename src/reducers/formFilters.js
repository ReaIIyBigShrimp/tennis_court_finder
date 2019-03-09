import ActionTypes from '../constants/ActionTypes';

const initialState = {
    courtCost: 'free',
    courtDistance: 1000
}

export default function courts(state = initialState, action) {
    switch (action.type) {
      case ActionTypes.UPDATE_FILTERS:
        //console.log(action.payload);
        return {
          ...action.payload
        }
      default:
        return state
    }
  }