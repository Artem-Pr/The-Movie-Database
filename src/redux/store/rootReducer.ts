import {combineReducers} from '@reduxjs/toolkit';

import {sessionReducer} from '../reducers';

const rootReducer = combineReducers({sessionReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
