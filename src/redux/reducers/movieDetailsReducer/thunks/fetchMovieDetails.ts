import {API} from 'src/api/API';
import type {MovieDetailsRequest} from 'src/api/getMovieDetails/types';
import type {AppThunk} from 'src/redux/store';

import {setMovieDetails} from '../movieDetailsSlice';
import {POSTERS_BASE_URL} from '../movieDetailsState';
import type {MovieDetails} from '../types';

export const prepareMovieDetails = (detailsFromRequest: MovieDetailsRequest): MovieDetails => ({
    id: detailsFromRequest.id,
    budget: detailsFromRequest.budget,
    genres: detailsFromRequest.genres,
    homepage: detailsFromRequest.homepage,
    overview: detailsFromRequest.overview,
    posterPath: `${POSTERS_BASE_URL}${detailsFromRequest.poster_path}`,
    releaseDate: detailsFromRequest.release_date,
    runtime: detailsFromRequest.runtime,
    title: detailsFromRequest.title,
    voteAverage: detailsFromRequest.vote_average,
    voteCount: detailsFromRequest.vote_count,
});

export const fetchMovieDetails = (movieId: string): AppThunk => (
    async dispatch => {
        const rawMovieDetails = await API.getMovieDetails(movieId);
        if (rawMovieDetails) {
            const movieDetails = prepareMovieDetails(rawMovieDetails);
            dispatch(setMovieDetails(movieDetails));
        }
    }
);
