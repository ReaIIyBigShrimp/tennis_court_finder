import { combineReducers } from 'redux';
import courts from './courts';
import formFilters from './formFilters';

const rootReducer = combineReducers({
    courts,
    formFilters
})

export default rootReducer