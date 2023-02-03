import React from 'react';

import {StarOutlined} from '@ant-design/icons';
import {List} from 'antd';

import {POSTERS_PREVIEW_BASE_URL} from 'src/redux/reducers/moviesReducer/moviesState';

import {getSkeleton} from '../helpers';

import styles from './MoviesListItem.module.scss';

const skeletonList = getSkeleton(1);

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
            ? skeletonList
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
