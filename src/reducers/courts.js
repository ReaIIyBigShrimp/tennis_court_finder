import ActionTypes from '../constants/ActionTypes';

const initialState = {
    courts: [],
    filteredCourts: [1,2,3],
    activeCourt: null
}

export default function courts(state = initialState, action) {
    switch (action.type) {
      case ActionTypes.ADD_COURTS:
        console.log(action);
        return {
          ...state,
            courts: action.payload
        }
      case ActionTypes.FILTER_COURTS:
        return state
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