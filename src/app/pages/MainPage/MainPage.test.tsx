import React from 'react'
import {render, screen, waitFor} from '@testing-library/react';
import {MainPage} from './MainPage';
import {fetchNextPopularMovies} from 'src/redux/reducers/moviesReducer/thunks';
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
    fetchNextPopularMovies: jest.fn(),
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


describe('MainPage', () => {
    it('should render List',  async () => {
        render(
            <MainPage />
        );
        
        const MockedList = await waitFor(() => screen.getByText('List'));
        expect(MockedList).toBeInTheDocument();
    })
    
    it('should render Title if searchString === ""',  async () => {
        const mockedSearchString = '';
        (getSearchString as jest.Mock).mockImplementation(() => mockedSearchString);
        render(
            <MainPage />
        );
        
        const MockedTitle = await waitFor(() => screen.getByText('Popular movies'))
        expect(MockedTitle).toBeInTheDocument()
    })
    
    it('should not render Title if searchString !== ""',  async () => {
        (getSearchString as jest.Mock).mockImplementation(() => 'mockedSearchString');
        render(
            <MainPage />
        );
    
        const MockedTitle = await waitFor(() => screen.queryByText('Popular movies'))
        expect(MockedTitle).not.toBeInTheDocument()
    })
    
    it('should call fetchPopularMovies',() => {
        render(
            <MainPage />
        );
        
        waitFor(() => (
            expect(fetchNextPopularMovies).toHaveBeenCalled()
        ));
    })
})
