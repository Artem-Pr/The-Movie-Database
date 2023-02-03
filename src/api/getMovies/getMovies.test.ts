import {axiosInstance} from '../config';
import {getMovies} from './getMovies';
import {errorNotification} from 'src/utils/notifications';

jest.mock('src/utils/notifications', () => ({
    errorNotification: jest.fn(),
}));

jest.mock('../config', () => ({
    axiosInstance: {
        get: jest.fn()
    }
}));

jest.spyOn(console, "error").mockImplementation(() => {})

const mockedAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>

describe('getPopularMovies', () => {
    it('should call axiosInstance.get', async () => {
        await getMovies(0)
        expect(axiosInstance.get).toHaveBeenCalled()
    })
    
    it('should call axiosInstance.get with parameters ("/movie/popular", mockedSecondParam)', async () => {
        const mockedSecondParam = {params: {page: 0}}
        await getMovies(0);
        expect(axiosInstance.get).toHaveBeenCalledWith("/movie/popular", mockedSecondParam)
    })
    
    it('should call axiosInstance.get with parameters ("/search/movie", mockedSecondParam)', async () => {
        const mockedSecondParam = {params: {page: 5, query: 'mockedSearchRequest'}}
        await getMovies(5, 'mockedSearchRequest');
        expect(axiosInstance.get).toHaveBeenCalledWith("/search/movie", mockedSecondParam)
    })
    
    it('should call errorNotification with parameters (Error, "Error loading movies")', async () => {
        mockedAxiosInstance.get.mockRejectedValue({
            message: 'Error',
        });
        await getMovies(0);
        expect(errorNotification).toHaveBeenCalledWith(new Error('Error'), 'Error loading movies')
    })
})
