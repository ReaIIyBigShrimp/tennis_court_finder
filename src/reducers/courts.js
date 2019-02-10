import ActionTypes from '../constants/ActionTypes';

const initialState = {
        courts: [],
        activeCourt: null
    }

export default function courts(state = initialState, action) {
    switch (action.type) {
      case ActionTypes.ADD_COURTS:

        console.log(action);
        return [
          ...state,
          {
            courts: action.payload
          }
        ]
      case ActionTypes.SET_ACTIVE_COURT:

        console.log(action);
        console.log(action.court);
        return {
          ...state,
          activeCourt: action.court
        }
      default:
        return state
    }
  }