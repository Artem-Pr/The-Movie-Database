import {combineReducers} from '@reduxjs/toolkit';

import {moviesReducer} from '../reducers';

const rootReducer = combineReducers({moviesReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
