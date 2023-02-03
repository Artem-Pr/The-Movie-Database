import {API} from 'src/api/API';
import type {AppThunk} from 'src/redux/store';

import {setMoviesArray, setTotalPages} from '../moviesSlice';

const MAX_NUMBER_OF_PAGES = 500;

export const normalizeTotalPages = (totalPages: number) => (
    totalPages > MAX_NUMBER_OF_PAGES ? MAX_NUMBER_OF_PAGES : totalPages
);

export const fetchPopularMovies = (): AppThunk => async dispatch => {
    const moviesList = await API.getPopularMovies();
    moviesList?.results && dispatch(setMoviesArray(moviesList.results));
    if (moviesList?.total_pages) {
        const normalizedTotalPages = normalizeTotalPages(moviesList?.total_pages);
        dispatch(setTotalPages(normalizedTotalPages));
    }
};
