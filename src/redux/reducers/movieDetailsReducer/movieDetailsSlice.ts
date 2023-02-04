/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {initialState} from './movieDetailsState';
import type {MovieDetails} from './types';

const movieDetails = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {
        setMovieDetails(state, action: PayloadAction<MovieDetails>) {
            state.details = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const movieDetailsReducer = movieDetails.reducer;

export const {
    setMovieDetails,
    setLoading,
} = movieDetails.actions;
