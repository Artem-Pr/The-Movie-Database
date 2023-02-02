import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import {Header as AntHeader} from 'antd/es/layout/layout';
import debounce from 'lodash.debounce';

import {getSearchString} from 'src/redux/selectors/sessionSelectors/sessionSelector';

import styles from './Header.module.scss';

export const Header = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(getSearchString);
    const debouncedFunc = debounce((value: string) => console.info(value), 500);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedFunc(event.target.value);
    };

    return (
        <AntHeader className="d-flex justify-between">
            <div className={styles.logo}>MovieDB</div>
            <div>
                <Input
                    placeholder="Search the movie"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </div>
        </AntHeader>
    );
};
