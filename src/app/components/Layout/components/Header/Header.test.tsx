import {render} from '@testing-library/react';
import {Header} from './Header';

jest.mock('@ant-design/icons', () => ({
    SearchOutlined: () => <div/>
}))

jest.mock('antd', () => ({
    Input: () => <div>Input</div>,
}))

jest.mock('antd/es/layout/layout', () => ({
    Header: ({children}: any) => <div>{children}</div>
}))

jest.mock('lodash.debounce', () => (
    (fn: any) => (searchString: string) => fn(searchString)
))

const mockedDispatch = () => {};
jest.mock('src/redux/store', () => ({
    useAppDispatch: () => mockedDispatch,
}))

jest.mock('src/redux/reducers/moviesReducer', () => ({
    setSearchString: () => {}
}))

describe('Header', () => {
    it('should render search Input', () => {
        const {getByText} = render(<Header/>)
        expect(getByText('Input')).toBeInTheDocument()
    })
})
