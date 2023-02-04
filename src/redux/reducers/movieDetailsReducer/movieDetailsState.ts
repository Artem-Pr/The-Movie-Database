import type {MovieDetails} from './types';

interface State {
    loading: boolean
    details: MovieDetails
}

export const POSTERS_BASE_URL = 'https://image.tmdb.org/t/p/w300';

export const initialState: State = {
    loading: true,
    details: {
        id: 0,
        budget: 0,
        genres: [],
        homepage: '',
        overview: '',
        posterPath: '',
        releaseDate: '',
        runtime: 0,
        title: '',
        voteAverage: 0,
        voteCount: 0,
    },
};
