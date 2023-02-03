import {fetchPopularMovies, normalizeTotalPages} from './fetchPopularMovies';
import {API} from 'src/api/API';
import {setMoviesArray, setTotalPages} from '../moviesSlice';

jest.mock('src/api/API', () => ({
    API: {
        getPopularMovies: jest.fn()
    }
}))
jest.mock('../moviesSlice', () => ({
    setMoviesArray: jest.fn(),
    setTotalPages: jest.fn(),
}))

describe('normalizeTotalPages', () => {
    it('should return 500 if totalPages > 500', () => {
        const totalPages = 501
        expect(normalizeTotalPages(totalPages)).toBe(500)
    })
    it('should return 100 if totalPages === 100', () => {
        const totalPages = 100
        expect(normalizeTotalPages(totalPages)).toBe(100)
    })
})

describe('fetchPopularMovies', () => {
    it('should call API.getPopularMovies', async () => {
        const mockedDispatch = (func: () => {}) => func
        const thunkFunc = fetchPopularMovies() as any
        thunkFunc(mockedDispatch)
        expect(API.getPopularMovies).toHaveBeenCalled()
    });
    
    it('should not call dispatch if API.getPopularMovies returns undefined', async () => {
        (API.getPopularMovies as jest.Mock).mockImplementation(() => undefined)
        
        const mockedDispatch = jest.fn((func: () => {}) => func)
        const thunkFunc = fetchPopularMovies() as any
        thunkFunc(mockedDispatch)
        expect(mockedDispatch).not.toHaveBeenCalled()
    });
    
    it('should call setMoviesArray with parameter ["results"] if API.getPopularMovies returns mockedResults', async () => {
        const mockedResults = {results: ["mockedResults"]};
        (API.getPopularMovies as jest.Mock).mockImplementation(() => mockedResults)
    
        const mockedDispatch = (func: () => {}) => func
        const thunkFunc = fetchPopularMovies() as any
        await thunkFunc(mockedDispatch)
        expect(setMoviesArray).toHaveBeenCalledWith(['mockedResults'])
    });
    
    it('should call setTotalPages with parameter "500" if API.getPopularMovies returns mockedResults', async () => {
        const mockedResults = {total_pages: 964};
        (API.getPopularMovies as jest.Mock).mockImplementation(() => mockedResults)
        
        const mockedDispatch = (func: () => {}) => func
        const thunkFunc = fetchPopularMovies() as any
        await thunkFunc(mockedDispatch)
        expect(setTotalPages).toHaveBeenCalledWith(500)
    });
})
