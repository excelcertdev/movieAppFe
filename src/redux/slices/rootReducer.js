import { combineReducers } from '@reduxjs/toolkit';
import userSlices from './userSlices';
import movieSlice from './movieSlice';

const rootReducer = combineReducers({
    user: userSlices,
    movie: movieSlice
    
});

export default rootReducer;