import {fetchMovies, normalizeTotalPages} from './fetchMovies';
import {API} from 'src/api/API';
import {
    setMoviesArray,
    setTotalPages,
    setCurrentPage,
} from '../moviesSlice';

jest.mock('src/api/API', () => ({
    API: {
        getMovies: jest.fn()
    }
}))
jest.mock('../moviesSlice', () => ({
    setMoviesArray: jest.fn(),
    setTotalPages: jest.fn(),
    setCurrentPage: jest.fn(),
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

describe('fetchMovies', () => {
    it('should call API.getPopularMovies', async () => {
        const mockedDispatch = (func: () => {}) => func
        const mockedGetState = () => ({
            moviesReducer: {movies: {page: 0, moviesList: []}}
        })
        
        const thunkFunc = fetchMovies({isFirstPage: true}) as any
        thunkFunc(mockedDispatch, mockedGetState)
        expect(API.getMovies).toHaveBeenCalled()
    });
    
    it('should not call dispatch if API.getPopularMovies returns undefined', async () => {
        (API.getMovies as jest.Mock).mockImplementation(() => undefined)
        
        const mockedDispatch = jest.fn((func: () => {}) => func)
        const mockedGetState = () => ({
            moviesReducer: {movies: {page: 0, moviesList: []}}
        })
    
        const thunkFunc = fetchMovies({isFirstPage: true}) as any
        thunkFunc(mockedDispatch, mockedGetState)
        expect(mockedDispatch).not.toHaveBeenCalled()
    });
    
    it(`should call setMoviesArray with parameter ["results"]
    if API.getPopularMovies returns mockedResults and isFirstPage === true`, async () => {
        const mockedResults = {results: ["mockedResults"]};
        const isFirstPage = true;
        (API.getMovies as jest.Mock).mockImplementation(() => mockedResults)
    
        const mockedDispatch = (func: () => {}) => func
        const mockedGetState = () => ({
            moviesReducer: {movies: {page: 0, moviesList: []}}
        })
    
        const thunkFunc = fetchMovies({isFirstPage}) as any
        await thunkFunc(mockedDispatch, mockedGetState)
        expect(setMoviesArray).toHaveBeenCalledWith(['mockedResults'])
    });
    
    it(`should call setMoviesArray with parameter ["previousPageResults","currentPageResults"]
    if API.getPopularMovies returns mockedResults and isFirstPage === undefined`, async () => {
        const mockedCurrentPageResults = {results: ["currentPageResults"]};
        const mockedPreviousPageMoviesList = ['previousPageResults'];
        const isFirstPage = undefined;
        (API.getMovies as jest.Mock).mockImplementation(() => mockedCurrentPageResults)
        
        const mockedDispatch = (func: () => {}) => func
        const mockedGetState = () => ({
            moviesReducer: {movies: {page: 0, moviesList: mockedPreviousPageMoviesList}}
        })
    
        const thunkFunc = fetchMovies({isFirstPage}) as any
        await thunkFunc(mockedDispatch, mockedGetState)
        expect(setMoviesArray).toHaveBeenCalledWith(["previousPageResults","currentPageResults"])
    });
    
    it('should call setTotalPages with parameter "500" if API.getPopularMovies returns mockedResults', async () => {
        const mockedResults = {total_pages: 964};
        (API.getMovies as jest.Mock).mockImplementation(() => mockedResults)
        
        const mockedDispatch = (func: () => {}) => func
        const mockedGetState = () => ({
            moviesReducer: {movies: {page: 0, moviesList: []}}
        })
        
        const thunkFunc = fetchMovies({}) as any
        await thunkFunc(mockedDispatch, mockedGetState)
        expect(setTotalPages).toHaveBeenCalledWith(500)
    });
    
    it('should call setCurrentPage with parameter 5 if API.getPopularMovies returns {page: 5}', async () => {
        (API.getMovies as jest.Mock).mockImplementation(() => ({page: 5}))
        
        const mockedDispatch = (func: () => {}) => func
        const mockedGetState = () => ({
            moviesReducer: {movies: {page: 0, moviesList: []}}
        })
        
        const thunkFunc = fetchMovies({}) as any
        await thunkFunc(mockedDispatch, mockedGetState)
        expect(setCurrentPage).toHaveBeenCalledWith(5)
    });
})
