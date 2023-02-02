/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {initialState} from './sessionState';

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSearchString(state, action: PayloadAction<string>) {
            state.searchString = action.payload;
        },
    },
});

export const sessionReducer = sessionSlice.reducer;

export const {
    setSearchString,
} = sessionSlice.actions;
