import type {MovieRequest} from 'src/api/getPopularMovies/types';

export interface Movies {
    page: number,
    moviesList: MovieRequest[],
    totalPages: number,
}
