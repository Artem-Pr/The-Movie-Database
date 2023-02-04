import type {Movies} from './types';

interface State {
    searchString: string
    movies: Movies
}

export const MAX_NUMBER_OF_PAGES = 500;
export const POSTERS_PREVIEW_BASE_URL = 'https://image.tmdb.org/t/p/w92';

export const initialState: State = {
    searchString: '',
    movies: {
        page: 0,
        moviesList: [],
        totalPages: 1,
    },
};
