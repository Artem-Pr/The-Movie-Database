import React from 'react';

import {StarOutlined} from '@ant-design/icons';
import {List} from 'antd';

import {POSTERS_PREVIEW_BASE_URL} from 'src/redux/reducers/moviesReducer/moviesState';

import styles from './MoviesListItem.module.scss';

interface Props {
    id: number
    title: string
    posterPath: string
    releaseDate: string
    overview: string
    voteAverage: number
    onListItemClick: (movieId: number) => void
}

export const MoviesListItem = React.memo(({
    id,
    title,
    posterPath,
    releaseDate,
    overview,
    voteAverage,
    onListItemClick,
}: Props) => {
    const handleListItemClick = () => {
        onListItemClick(id);
    };

    return (
        <List.Item
            className={styles.wrapper}
            onClick={handleListItemClick}
            actions={[
                <div key="list-vertical-star-o">
                    <StarOutlined />
                    <span className="ml-10">{voteAverage}</span>
                </div>,
            ]}
            extra={(
                <img
                    width={100}
                    alt={title}
                    src={`${POSTERS_PREVIEW_BASE_URL}${posterPath}`}
                />
            )}
        >
            <List.Item.Meta
                title={title}
                description={releaseDate}
            />
            <p className={styles.overview}>
                {overview}
            </p>
        </List.Item>
    );
});
