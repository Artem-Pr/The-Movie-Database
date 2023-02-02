import React from 'react';
import {Outlet} from 'react-router-dom';

import {Layout as AntdLayout} from 'antd';
import cn from 'classnames';

import {Header} from './components';

import styles from './Layout.module.scss';

export const Layout = () => (
    <AntdLayout className={cn(styles.contentWrapper, 'h-100vh d-grid')}>
        <Header />
        <Outlet />
    </AntdLayout>
);
