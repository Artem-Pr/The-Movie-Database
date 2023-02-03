import {getSkeleton} from './getSkeleton';
import {render, screen} from '@testing-library/react';

jest.mock('antd', () => {
    const MockedSkeleton: any = () => <div>Skeleton</div>
    MockedSkeleton.Image = () => <div>Skeleton.Image</div>
    
    return {
        Divider: () => <div>Divider</div>,
        Skeleton: MockedSkeleton
    }
})

describe('getSkeleton', () => {
    it('should return undefined if numberOfRows === 0', () => {
        const numberOfRows = 0
        
        expect(getSkeleton(numberOfRows)).toBeUndefined()
    })
    
    it('should return one Skeleton if numberOfRows === 1', () => {
        const numberOfRows = 1
        render(<>{getSkeleton(numberOfRows)}</>)
        
        expect(screen.getByText('Skeleton')).toBeInTheDocument()
    })
    
    it('should return 3 elements "Divider" if numberOfRows === 4', async () => {
        const numberOfRows = 4
        render(<>{getSkeleton(numberOfRows)}</>)
        
        const allDividers = await screen.findAllByText('Divider')
        expect(allDividers).toHaveLength(3)
    })
})
