import {getGenresString, prepareMovieProperties} from './prepareMovieProperties';
import type {MovieGenre} from 'src/api/getMovieDetails/types';
import type {MovieDetails} from 'src/redux/reducers/movieDetailsReducer/types';

const mockedGenderArray: MovieGenre[] = [
    {
        id: 1,
        name: 'Action',
    },
    {
        id: 2,
        name: 'Adventure',
    },
    {
        id: 3,
        name: 'Science Fiction',
    },
]

describe('getGenresString', () => {
    it('should return "Action, Adventure, Science Fiction" if movieGenders === mockedGenderArray', () => {
        expect(getGenresString(mockedGenderArray)).toBe('Action, Adventure, Science Fiction')
    })
    
    it('should return an empty line if movieGenders === []', () => {
        expect(getGenresString([])).toBe('')
    })
})

describe('prepareMovieProperties', () => {
    it('should return mockedPropertyListItem if the input will be mockedMovieDetails', () => {
        const mockedMovieDetails: MovieDetails = {
            id: 0,
            homepage: '',
            overview: '',
            posterPath: '',
            title: '',
            genres: mockedGenderArray,
            voteAverage: 5.666,
            voteCount: 5,
            releaseDate: '2022-11-09',
            runtime: 162,
            budget: 100,
        }
        const mockedPropertyListItem = [
            {
                name: 'Genres',
                value: 'Action, Adventure, Science Fiction',
            },
            {
                name: 'Vote Average',
                value: 5.7,
            },
            {
                name: 'Vote Count',
                value: 5,
            },
            {
                name: 'Release Date',
                value: '2022.11.09',
            },
            {
                name: 'Runtime',
                value: '162 min',
            },
            {
                name: 'Budget',
                value: '100 $',
            },
        ]
        
        expect(prepareMovieProperties(mockedMovieDetails)).toEqual(mockedPropertyListItem)
    })
})
