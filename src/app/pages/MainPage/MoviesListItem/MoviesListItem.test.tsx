import {MoviesListItem} from './MoviesListItem';
import {render, screen} from '@testing-library/react';

jest.mock('@ant-design/icons', () => ({
    StarOutlined: () => <div>StarOutlinedIcon</div>
}))

jest.mock('antd', () => {
    const MockedSkeleton: any = () => <div>Skeleton</div>
    const MockedList: any = {
        Item: ({actions, extra, children}: any) => <div>{actions}{extra}{children}</div>
    }
    MockedList.Item.Meta = () => <div>List.Item.Meta</div>
    MockedSkeleton.Image = () => <div>Skeleton.Image</div>
    
    return {
        List: MockedList,
        Skeleton: MockedSkeleton,
    }
})

jest.mock('src/utils/imageOnLoad', () => ({
    imageOnLoad: () => {}
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
