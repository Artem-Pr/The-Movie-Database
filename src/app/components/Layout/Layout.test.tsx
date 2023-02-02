import {render} from '@testing-library/react';
import {Layout} from './Layout';

jest.mock('react-router-dom', () => ({
    Outlet: () => <div>Outlet</div>
}))

jest.mock('./components', () => ({
    Header: () => <div>Header</div>
}))

jest.mock('antd', () => ({
    Layout: ({children}: any) => <div>{children}</div>
}))


describe('Layout', () => {
    it('should render Outlet', () => {
        const {getByText} = render(<Layout/>)
        expect(getByText('Outlet')).toBeInTheDocument()
    })
})
