import type {MovieRequest} from 'src/api/getMovies/types';

export interface Movies {
    page: number,
    moviesList: MovieRequest[],
    totalPages: number,
}
