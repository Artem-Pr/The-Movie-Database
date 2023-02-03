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
        await getPopularMovies(0)
        expect(axiosInstance.get).toHaveBeenCalled()
    })
    
    it('should call axiosInstance.get with parameters ("/movie/popular", mockedSecondParam)', async () => {
        const mockedSecondParam = {params: {page: 0}}
        await getPopularMovies(0);
        expect(axiosInstance.get).toHaveBeenCalledWith("/movie/popular", mockedSecondParam)
    })
    
    it('should call errorNotification with parameters (Error, "Error loading movies")', async () => {
        mockedAxiosInstance.get.mockRejectedValue({
            message: 'Error',
        });
        await getPopularMovies(0);
        expect(errorNotification).toHaveBeenCalledWith(new Error('Error'), 'Error loading movies')
    })
})
