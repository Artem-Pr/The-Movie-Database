import {MovieGenre} from 'src/api/getMovieDetails/types';

export interface MovieDetails {
    id: number
    budget: number
    genres: MovieGenre[],
    homepage: string
    overview: string
    posterPath: string
    releaseDate: string
    runtime: number
    title: string
    voteAverage: number
    voteCount: number
}
