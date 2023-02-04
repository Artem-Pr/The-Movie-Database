import {API} from 'src/api/API';
import type {AppThunk} from 'src/redux/store';

import {
    setCurrentPage,
    setMoviesArray,
    setSearchString,
    setTotalPages,
} from '../moviesSlice';
import {MAX_NUMBER_OF_PAGES} from '../moviesState';

export const normalizeTotalPages = (totalPages: number) => (
    totalPages > MAX_NUMBER_OF_PAGES ? MAX_NUMBER_OF_PAGES : totalPages
);

interface FetchMoviesThunk {
    query?: string
    isFirstPage?: boolean
}

export const fetchMovies = ({query, isFirstPage}: FetchMoviesThunk): AppThunk => (
    async (dispatch, getState) => {
        const {page, moviesList} = getState().moviesReducer.movies;
        const nextPage = isFirstPage ? 1 : page + 1;

        dispatch(setSearchString(query || ''));

        const newMoviesEntity = await API.getMovies(nextPage, query);

        newMoviesEntity?.page && dispatch(setCurrentPage(newMoviesEntity.page));

        if (newMoviesEntity?.results) {
            const updatedMoviesList = isFirstPage
                ? newMoviesEntity.results
                : [...moviesList, ...newMoviesEntity.results];
            dispatch(setMoviesArray(updatedMoviesList));
        }

        if (newMoviesEntity?.total_pages) {
            const normalizedTotalPages = normalizeTotalPages(newMoviesEntity.total_pages);
            dispatch(setTotalPages(normalizedTotalPages));
        }
    });
