import type {Movies} from './types';

interface State {
    searchString: string
    movies: Movies
}

export const initialState: State = {
    searchString: '',
    movies: {
        page: 1,
        moviesList: [],
        totalPages: 1,
    },
};
