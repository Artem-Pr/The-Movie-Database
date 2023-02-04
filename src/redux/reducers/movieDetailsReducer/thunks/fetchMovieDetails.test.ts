import {API} from 'src/api/API';
import {fetchMovieDetails, prepareMovieDetails} from './fetchMovieDetails';
import {setMovieDetails} from '../movieDetailsSlice';

jest.mock('src/api/API', () => ({
    API: {
        getMovieDetails: jest.fn()
    }
}))

jest.mock('../movieDetailsSlice', () => ({
    setMovieDetails: jest.fn()
}))

const movieDetailsRequestMockedData = {
    "adult": false,
    "backdrop_path": "/faXT8V80JRhnArTAeYXz0Eutpv9.jpg",
    "belongs_to_collection": {
        "id": 94602,
        "name": "Puss in Boots Collection",
        "poster_path": "/anHwj9IupRoRZZ98WTBvHpTiE6A.jpg",
        "backdrop_path": "/feU1DWV5zMWxXUHJyAIk3dHRQ9c.jpg"
    },
    "budget": 90000000,
    "genres": [
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
    ],
    "homepage": "https://www.dreamworks.com/movies/puss-in-boots-the-last-wish",
    "id": 315162,
    "imdb_id": "tt3915174",
    "original_language": "en",
    "original_title": "Puss in Boots: The Last Wish",
    "overview": "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
    "popularity": 4289.433,
    "poster_path": "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    "production_companies": [
        {
            "id": 33,
            "logo_path": "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
            "name": "Universal Pictures",
            "origin_country": "US"
        },
        {
            "id": 521,
            "logo_path": "/kP7t6RwGz2AvvTkvnI1uteEwHet.png",
            "name": "DreamWorks Animation",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2022-12-07",
    "revenue": 336351055,
    "runtime": 103,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        },
        {
            "english_name": "Spanish",
            "iso_639_1": "es",
            "name": "Español"
        }
    ],
    "status": "Released",
    "tagline": "Say hola to his little friends.",
    "title": "Puss in Boots: The Last Wish",
    "video": false,
    "vote_average": 8.562,
    "vote_count": 3195
}

describe('prepareMovieDetails', () => {
    it('should return MovieDetailsObject', () => {
        const MovieDetailsObject = {
            id: 315162,
            budget: 90000000,
            genres: [
                {
                    "id": 16,
                    "name": "Animation"
                },
                {
                    "id": 12,
                    "name": "Adventure"
                },
            ],
            homepage: "https://www.dreamworks.com/movies/puss-in-boots-the-last-wish",
            overview: "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
            posterPath: `https://image.tmdb.org/t/p/w300/kuf6dutpsT0vSVehic3EZIqkOBt.jpg`,
            releaseDate: "2022-12-07",
            runtime: 103,
            title: "Puss in Boots: The Last Wish",
            voteAverage: 8.562,
            voteCount: 3195,
        }
        
        expect(prepareMovieDetails(movieDetailsRequestMockedData)).toEqual(MovieDetailsObject)
    })
})

describe('fetchMovieDetails', () => {
    it('should call API.getMovieDetails',() => {
        const mockedDispatch = (func: () => {}) => func
    
        const thunkFunc = fetchMovieDetails('') as any
        thunkFunc(mockedDispatch)
        expect(API.getMovieDetails).toHaveBeenCalled()
    });
    
    it('should call API.getMovieDetails with parameter "mockedMovieId"',() => {
        const mockedDispatch = (func: () => {}) => func
        
        const thunkFunc = fetchMovieDetails('mockedMovieId') as any
        thunkFunc(mockedDispatch)
        expect(API.getMovieDetails).toHaveBeenCalledWith('mockedMovieId')
    });
    
    it('should return undefined if API.getMovieDetails returns undefined',async () => {
        (API.getMovieDetails as jest.Mock).mockImplementation(() => undefined)
        const mockedDispatch = (func: () => {}) => func
        
        const thunkFunc = fetchMovieDetails('') as any
        const response = await thunkFunc(mockedDispatch)
        
        expect(response).toBeUndefined()
    });
    
    it('should call setMovieDetails with parameter mockedMovieDetailsObject',async () => {
        const MovieDetailsObject = {
            id: 315162,
            budget: 90000000,
            genres: [
                {
                    "id": 16,
                    "name": "Animation"
                },
                {
                    "id": 12,
                    "name": "Adventure"
                },
            ],
            homepage: "https://www.dreamworks.com/movies/puss-in-boots-the-last-wish",
            overview: "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
            posterPath: `https://image.tmdb.org/t/p/w300/kuf6dutpsT0vSVehic3EZIqkOBt.jpg`,
            releaseDate: "2022-12-07",
            runtime: 103,
            title: "Puss in Boots: The Last Wish",
            voteAverage: 8.562,
            voteCount: 3195,
        };
        (API.getMovieDetails as jest.Mock).mockImplementation(() => movieDetailsRequestMockedData)
        
        const mockedDispatch = (func: () => {}) => func
        
        const thunkFunc = fetchMovieDetails('') as any
        
        await thunkFunc(mockedDispatch)
        expect(setMovieDetails).toHaveBeenCalledWith(MovieDetailsObject)
    });
})
