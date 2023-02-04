import {MoviesListItem} from './MoviesListItem';
import {render, screen} from '@testing-library/react';

jest.mock('@ant-design/icons', () => ({
    StarOutlined: () => <div>StarOutlinedIcon</div>
}))

jest.mock('antd', () => {
    const MockedList: any = {
        Item: ({actions, extra, children}: any) => <div>{actions}{extra}{children}</div>
    }
    MockedList.Item.Meta = () => <div>List.Item.Meta</div>
    
    return {
        List: MockedList,
    }
})

jest.mock('../helpers', () => ({
    getSkeleton: () => 'MockedSkeleton',
}))

const mockedProps = {
    id: 0,
    title:'mockedTitle',
    posterPath:'mockedPosterPath',
    releaseDate:'mockedReleaseDate',
    overview:'mockedOverview',
    voteAverage: 1,
    onListItemClick: () => {},
}

describe('MoviesListItem', () => {
    it('should render', () => {
        render(
            <MoviesListItem {...mockedProps}/>
        )
    })
    
    describe('if loading === true', () => {
        it('should not render "actions"', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.queryByText('StarOutlinedIcon')).not.toBeInTheDocument()
        })
        it('should not render "extra"', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.queryByAltText('mockedTitle')).not.toBeInTheDocument()
        })
        it('should render Skeleton', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.getByText('MockedSkeleton')).toBeInTheDocument()
        })
        it('should not render List.Item', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.queryByText('List.Item.Meta')).not.toBeInTheDocument()
        })
    })
    
    describe('if loading === false', () => {
        it('should render "actions"', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.getByText('StarOutlinedIcon')).toBeInTheDocument()
        })
        it('should render "extra"', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.getByAltText('mockedTitle')).toBeInTheDocument()
        })
        it('should not render Skeleton', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.queryByText('Skeleton')).not.toBeInTheDocument()
        })
        it('should render List.Item', () => {
            render(
                <MoviesListItem {...mockedProps}/>
            )
            expect(screen.getByText('List.Item.Meta')).toBeInTheDocument()
        })
    })
})
