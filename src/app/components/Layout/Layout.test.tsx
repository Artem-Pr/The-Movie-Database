import {render} from '@testing-library/react';
import {Layout} from './Layout';

jest.mock('react-router-dom', () => ({
    Outlet: () => <div>Outlet</div>
}))

jest.mock('@ant-design/icons', () => ({
    SearchOutlined: () => <div/>
}))

jest.mock('antd', () => ({
    Input: () => <div>Input</div>,
    Layout: ({children}: any) => <div>{children}</div>
}))

jest.mock('antd/es/layout/layout', () => ({
    Header: ({children}: any) => <div>{children}</div>
}))


describe('Layout', () => {
    it('should render search Input', () => {
        const {getByText} = render(<Layout/>)
        expect(getByText('Input')).toBeInTheDocument()
    })
})
