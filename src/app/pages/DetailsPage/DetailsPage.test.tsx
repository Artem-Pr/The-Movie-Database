import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import {DetailsPage} from './DetailsPage';

jest.mock('react-redux', () => ({
    useSelector: (func: () => any) => func(),
}))

const mockedDispatch = jest.fn();
jest.mock('src/redux/store', () => ({
    useAppDispatch: () => mockedDispatch,
}))

jest.mock('react-router-dom', () => ({
    useNavigate: () => () => {},
    useParams: () => ({id: 100}),
}))

jest.mock('antd', () => {
    const MockedSkeleton: any = () => <div>Skeleton</div>
    MockedSkeleton.Input = () => <div>Skeleton.Input</div>
    const Descriptions: any = () => <div>Descriptions</div>
    Descriptions.Item = () => <div>Descriptions.Item</div>
    
    return {
        Button: () => <div>Button</div>,
        Descriptions: Descriptions,
        Skeleton: MockedSkeleton,
        Typography: {
            Title: ({children}: any) => <div>{children}</div>,
            Paragraph: ({children}: any) => <div>{children}</div>,
            Text: ({children}: any) => <div>{children}</div>,
            Link: ({children}: any) => <div>{children}</div>,
        },
    }
})

jest.mock('src/assets/images/image-placeholder.svg', () => (
    'mockedImgPlaceholder'
))

jest.mock('src/redux/reducers/movieDetailsReducer/thunks', () => ({
    fetchMovieDetails: jest.fn()
}))

jest.mock('src/redux/selectors/movieDetailsSelectors', () => ({
    getMovieDetails: () => ({
        title: 'mockedTitle',
        posterPath: 'Poster Path',
        overview: 'Overview',
        homepage: 'Homepage',
        id: 1,
    }),
    getMovieProperties: () => []
}))

jest.mock('src/utils/imageOnLoad', () => ({
    imageOnLoad: () => {}
}))

describe('DetailsPage', () => {
    it('should render',async () => {
        render(
            <DetailsPage />
        )
        
        await waitFor(() => {
            expect(screen.getByText('Button')).toBeInTheDocument()
        })
    })
    
    it('should render Skeleton.Input if loading === true',async () => {
        render(
            <DetailsPage />
        )
        
        await waitFor(() => {
            expect(screen.getByText('Skeleton.Input')).toBeInTheDocument()
        })
    })
    
    it('should render 2 Skeletons if loading === true',async () => {
        render(
            <DetailsPage />
        )
        
        const allSkeletons = await screen.findAllByText('Skeleton')
        expect(allSkeletons).toHaveLength(2)
    })
    
    it('should render Title if loading === false (second page render)',async () => {
        render(
            <DetailsPage />
        )
        
        const mockedTitle = await waitFor(() => screen.getByText('mockedTitle'))
        expect(mockedTitle).toBeInTheDocument()
    })
})
