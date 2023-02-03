import React from 'react';

import {StarOutlined} from '@ant-design/icons';
import {
    List,
    Skeleton,
} from 'antd';

import {POSTERS_PREVIEW_BASE_URL} from 'src/redux/reducers/moviesReducer/moviesState';

import styles from './MoviesListItem.module.scss';

interface Props {
    loading: boolean
    title: string
    posterPath: string
    releaseDate: string
    overview: string
    voteAverage: number
}

export const MoviesListItem = React.memo(({
    loading,
    title,
    posterPath,
    releaseDate,
    overview,
    voteAverage,
}: Props) => (
    <List.Item
        actions={!loading
            ? [
                <div key="list-vertical-star-o">
                    <StarOutlined />
                    <span className="ml-10">{voteAverage}</span>
                </div>,
            ]
            : undefined}
        extra={
            !loading && (
                <img
                    width={100}
                    alt={title}
                    src={`${POSTERS_PREVIEW_BASE_URL}${posterPath}`}
                />
            )
        }
    >
        {loading
            ? (
                <div className="d-flex gap-20 align-center">
                    <Skeleton active />
                    <Skeleton.Image active />
                </div>
            )
            : (
                <>
                    <List.Item.Meta
                        title={title}
                        description={releaseDate}
                    />
                    <p className={styles.overview}>
                        {overview}
                    </p>
                </>
            )}
    </List.Item>
));
