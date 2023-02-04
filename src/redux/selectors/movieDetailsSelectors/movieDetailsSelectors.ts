import {createSelector} from '@reduxjs/toolkit';

import type {PropertyListItem} from 'src/app/pages/DetailsPage';

import type {RootState} from '../../store/rootReducer';

import {prepareMovieProperties} from './helpers/prepareMovieProperties';

export const getMovieDetails = (state: RootState) => state.movieDetailsReducer.details;
export const getMovieDetailsLoading = (state: RootState) => state.movieDetailsReducer.loading;

export const getMovieProperties: (state: RootState) => PropertyListItem[] = createSelector(
    getMovieDetails,
    prepareMovieProperties,
);
