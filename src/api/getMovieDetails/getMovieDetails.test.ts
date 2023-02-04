import {axiosInstance} from '../config';
import {getMovieDetails} from './getMovieDetails';

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

// @ts-ignore
delete window.location;
// @ts-ignore
window.location = Object.assign(new URL("https://mockURL.org"), {
    ancestorOrigins: "",
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn()
});


describe('getMovieDetails', () => {
    it('should call axiosInstance.get', async () => {
        await getMovieDetails('123')
        expect(axiosInstance.get).toHaveBeenCalled()
    })
    
    it('should call axiosInstance.get with parameter "/movie/123"', async () => {
        await getMovieDetails('123');
        expect(axiosInstance.get).toHaveBeenCalledWith("/movie/123")
    })
    
    it('should call window.location.replace', async () => {
        mockedAxiosInstance.get.mockRejectedValue({
            message: 'Error',
        });
        await getMovieDetails('123');
        expect(window.location.replace).toHaveBeenCalled()
    })
})
