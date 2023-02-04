import dayjs from 'dayjs';

import type {MovieGenre} from 'src/api/getMovieDetails/types';
import type {PropertyListItem} from 'src/app/pages/DetailsPage';
import {DateFormats} from 'src/globalTypes/DateFormats';
import type {MovieDetails} from 'src/redux/reducers/movieDetailsReducer/types';

export const getGenresString = (movieGenders: MovieGenre[]) => (
    movieGenders.reduce((accum, gender) => (
        `${accum ? `${accum}, ` : ''}${gender.name}`
    ), '')
);

export const prepareMovieProperties = ({
    genres,
    voteAverage,
    voteCount,
    releaseDate,
    runtime,
    budget,
}: MovieDetails): PropertyListItem[] => [
    {
        name: 'Genres',
        value: getGenresString(genres),
    },
    {
        name: 'Vote Average',
        value: Math.round(voteAverage * 10) / 10,
    },
    {
        name: 'Vote Count',
        value: voteCount,
    },
    {
        name: 'Release Date',
        value: dayjs(releaseDate)
            .format(DateFormats.MAIN),
    },
    {
        name: 'Runtime',
        value: `${runtime} min`,
    },
    {
        name: 'Budget',
        value: `${budget} $`,
    },
];
