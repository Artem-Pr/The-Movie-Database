import React from 'react';
import {Outlet} from 'react-router-dom';

import {SearchOutlined} from '@ant-design/icons';
import {Input, Layout as AntdLayout} from 'antd';
import {Header} from 'antd/es/layout/layout';
import cn from 'classnames';

import styles from './Layout.module.scss';

export const Layout = () => (
    <AntdLayout className={cn(styles.contentWrapper, 'h-100vh d-grid')}>
        <Header className="d-flex justify-between">
            <div className={styles.logo}>MovieDB</div>
            <div>
                <Input
                    placeholder="Search the movie"
                    prefix={<SearchOutlined />}
                />
            </div>
        </Header>
        <Outlet />
    </AntdLayout>
);
