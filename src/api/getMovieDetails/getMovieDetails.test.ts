import {axiosInstance} from '../config';
import {getMovieDetails} from './getMovieDetails';
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

describe('getMovieDetails', () => {
    it('should call axiosInstance.get', async () => {
        await getMovieDetails('123')
        expect(axiosInstance.get).toHaveBeenCalled()
    })
    
    it('should call axiosInstance.get with parameter "/movie/123"', async () => {
        await getMovieDetails('123');
        expect(axiosInstance.get).toHaveBeenCalledWith("/movie/123")
    })
    
    it('should call errorNotification with parameters (Error, "Error loading movie details")', async () => {
        mockedAxiosInstance.get.mockRejectedValue({
            message: 'Error',
        });
        await getMovieDetails('123');
        expect(errorNotification).toHaveBeenCalledWith(new Error('Error'), 'Error loading movie details')
    })
})
