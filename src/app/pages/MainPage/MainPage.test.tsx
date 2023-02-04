import React from 'react'
import {
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import {MainPage} from './MainPage';
import {fetchMovies} from 'src/redux/reducers/moviesReducer/thunks';
import {getSearchString} from 'src/redux/selectors/moviesSelectors';

jest.mock('react-infinite-scroll-component', () => (
    ({children}: any) => <div>{children}</div>
))

jest.mock('antd', () => ({
    Divider: () => <div>Divider</div>,
    List: () => <div>List</div>,
    Typography: {
        Title: ({children}: any) => <div>{children}</div>
    }
}))

jest.mock('src/redux/reducers/moviesReducer/thunks', () => ({
    fetchMovies: jest.fn(),
}))

jest.mock('src/redux/selectors/moviesSelectors', () => ({
    getMoviesList: () => ({
        moviesList: []
    }),
    getSearchString: jest.fn(),
}))

jest.mock('./MoviesListItem', () => ({
    MoviesListItem: () => <div />,
}))

jest.mock('react-redux', () => ({
    useSelector: (func: () => any) => func(),
}))

const mockedDispatch = jest.fn();
jest.mock('src/redux/store', () => ({
    useAppDispatch: () => mockedDispatch,
}))

jest.mock('./helpers', () => ({
    getSkeleton: () => 'mockedSkeleton',
}))

jest.mock('react-infinite-scroll-component', () => (
    ({children}: any) => <div>{children}</div>
));

jest.mock('react-router-dom', () => ({
    useNavigate: () => () => {},
}))

Element.prototype.scrollIntoView = jest.fn();

describe('MainPage', () => {
    it('should render',  async () => {
        render(
            <MainPage />
        );
        
        const MockedList = await waitFor(() => screen.getByText('List'));
        expect(MockedList).toBeInTheDocument();
    })
    
    it('should render "Popular movies" if searchString === ""',  async () => {
        const mockedSearchString = '';
        (getSearchString as jest.Mock).mockImplementation(() => mockedSearchString);
        render(
            <MainPage />
        );
        
        const MockedTitle = await waitFor(() => screen.getByText('Popular movies'))
        expect(MockedTitle).toBeInTheDocument()
    })
    
    it('should render "Searching results" if searchString !== ""',  async () => {
        (getSearchString as jest.Mock).mockImplementation(() => 'mockedSearchString');
        render(
            <MainPage />
        );
    
        const MockedTitle = await waitFor(() => screen.getByText('Searching results'))
        expect(MockedTitle).toBeInTheDocument()
    })
    
    it('should call fetchPopularMovies',() => {
        render(
            <MainPage />
        );
        
        waitFor(() => (
            expect(fetchMovies).toHaveBeenCalled()
        ));
    })
    
    it('should render mockedSkeleton if loading === true', async () => {
        render(
            <MainPage />
        );
    
        await waitFor(() => {
            screen.getByText('mockedSkeleton')
            expect(screen.getByText('mockedSkeleton')).toBeInTheDocument();
        })
    })
})
