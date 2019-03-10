import ActionTypes from '../constants/ActionTypes';

const initialState = {
    courts: [],
    filteredCourts: [],
    activeCourt: null,
    userLocation: []
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
        return {
          ...state,
          filteredCourts: action.payload
        }
        
      case ActionTypes.SET_ACTIVE_COURT:

        console.log(action);
        console.log(action.court);
        return {
          ...state,
          activeCourt: action.court
        }
      
      case ActionTypes.SET_USER_LOCATION: 

        console.log(action.payload);
        return {
          ...state,
          userLocation: action.payload
        }
      default:
        return state
    }
  }