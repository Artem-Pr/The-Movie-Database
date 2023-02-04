import {combineReducers} from '@reduxjs/toolkit';

import {
    moviesReducer,
    movieDetailsReducer,
} from '../reducers';

const rootReducer = combineReducers({
    moviesReducer,
    movieDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
