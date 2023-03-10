import React from 'react';
import {useNavigate} from 'react-router-dom';

import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import {Header as AntHeader} from 'antd/es/layout/layout';
import debounce from 'lodash.debounce';

import {RoutePaths} from 'src/globalTypes/RoutePaths';
import {setSearchString} from 'src/redux/reducers/moviesReducer';
import {useAppDispatch} from 'src/redux/store';

import styles from './Header.module.scss';

const DEBOUNCE_SEARCH_FUNC_DELAY = 500;

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const debouncedSearchFunc = debounce((searchString: string) => {
        dispatch(setSearchString(searchString));
        navigate(RoutePaths.MAIN);
    }, DEBOUNCE_SEARCH_FUNC_DELAY);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearchFunc(event.target.value);
    };

    return (
        <AntHeader className="d-flex justify-between gap-20">
            <div className={styles.logo}>MovieDB</div>
            <div>
                <Input
                    placeholder="Search the movie"
                    prefix={<SearchOutlined />}
                    onChange={handleSearchChange}
                />
            </div>
        </AntHeader>
    );
};
