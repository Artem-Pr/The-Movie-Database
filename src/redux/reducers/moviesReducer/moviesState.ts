import type {Movies} from './types';

interface State {
    searchString: string
    movies: Movies
}

export const PAGE_SIZE = 20;
export const MAX_NUMBER_OF_PAGES = 500;
export const POSTERS_PREVIEW_BASE_URL = 'https://image.tmdb.org/t/p/w92';

const moviesListForSkeleton = Array.from({length: 3})
    .map((__, idx) => ({
        adult: false,
        backdrop_path: '',
        genre_ids: [],
        id: idx,
        original_language: '',
        original_title: '',
        overview: '',
        popularity: 1,
        poster_path: '',
        release_date: '',
        title: '',
        video: false,
        vote_average: 1,
        vote_count: 1,
    }));

export const initialState: State = {
    searchString: '',
    movies: {
        page: 0,
        moviesList: moviesListForSkeleton,
        totalPages: 0,
    },
};
