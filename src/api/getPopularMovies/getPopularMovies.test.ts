import {axiosInstance} from '../config';
import {getPopularMovies} from './getPopularMovies';
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
        await getPopularMovies()
        expect(axiosInstance.get).toHaveBeenCalled()
    })
    
    it('should call axiosInstance.get with parameter "/movie/popular"', async () => {
        await getPopularMovies();
        expect(axiosInstance.get).toHaveBeenCalledWith("/movie/popular")
    })
    
    it('should call errorNotification with parameters (Error, "Error loading movies")', async () => {
        mockedAxiosInstance.get.mockRejectedValue({
            message: 'Error',
        });
        await getPopularMovies();
        expect(errorNotification).toHaveBeenCalledWith(new Error('Error'), 'Error loading movies')
    })
})
