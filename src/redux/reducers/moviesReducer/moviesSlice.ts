/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {MovieRequest} from 'src/api/getPopularMovies/types';

import {initialState} from './moviesState';

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSearchString(state, action: PayloadAction<string>) {
            state.searchString = action.payload;
        },
        setMoviesArray(state, action: PayloadAction<MovieRequest[]>) {
            state.movies.moviesList = action.payload;
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.movies.totalPages = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.movies.page = action.payload;
        },
    },
});

export const moviesReducer = moviesSlice.reducer;

export const {
    setSearchString,
    setCurrentPage,
    setMoviesArray,
    setTotalPages,
} = moviesSlice.actions;
