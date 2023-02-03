import React from 'react';

import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import {Header as AntHeader} from 'antd/es/layout/layout';
import debounce from 'lodash.debounce';

import {fetchMovies} from 'src/redux/reducers/moviesReducer/thunks';
import {useAppDispatch} from 'src/redux/store';

import styles from './Header.module.scss';

const DEBOUNCE_SEARCH_FUNC_DELAY = 500;

export const Header = () => {
    const dispatch = useAppDispatch();

    const debouncedSearchFunc = debounce((searchString: string) => {
        dispatch(fetchMovies({
            query: searchString,
            isFirstPage: true,
        }));
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
