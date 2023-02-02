/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {initialState} from './moviesState';

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSearchString(state, action: PayloadAction<string>) {
            state.searchString = action.payload;
        },
    },
});

export const moviesReducer = moviesSlice.reducer;

export const {
    setSearchString,
} = moviesSlice.actions;
