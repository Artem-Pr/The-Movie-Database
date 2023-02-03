import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector} from 'react-redux';

import {
    Divider,
    List,
    Typography,
} from 'antd';
import cn from 'classnames';

import {MAX_NUMBER_OF_PAGES, PAGE_SIZE} from 'src/redux/reducers/moviesReducer/moviesState';
import {fetchNextPopularMovies} from 'src/redux/reducers/moviesReducer/thunks';
import {getMoviesList, getSearchString} from 'src/redux/selectors/moviesSelectors';
import {useAppDispatch} from 'src/redux/store';

import {MoviesListItem} from './MoviesListItem';
import {getSkeleton} from './helpers';

import styles from './MainPage.module.scss';

const {Title} = Typography;
const skeletonList = getSkeleton(3);

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const searchString = useSelector(getSearchString);
    const {moviesList} = useSelector(getMoviesList);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dispatchMovies = async () => {
            setLoading(true);
            await dispatch(fetchNextPopularMovies(true));
            setLoading(false);
        };

        void dispatchMovies();
    }, [dispatch]);

    const fetchNextPage = () => {
        void dispatch(fetchNextPopularMovies());
    };

    const hasMoreScrollData = moviesList.length < PAGE_SIZE * MAX_NUMBER_OF_PAGES;

    return (
        <div
            id="scrollableDiv"
            className={cn(styles.wrapper, 'd-flex')}
        >
            <div className={cn(styles.content, 'mw-auto')}>
                {!searchString && (
                    <Title
                        level={2}
                        className="text-center"
                    >
                        Popular movies
                    </Title>
                )}
                <InfiniteScroll
                    dataLength={moviesList.length}
                    next={fetchNextPage}
                    hasMore={hasMoreScrollData}
                    loader={(
                        <div className="m-10 p-10">
                            {skeletonList}
                        </div>
                    )}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={moviesList}
                        renderItem={item => (
                            <MoviesListItem
                                key={item.id}
                                loading={loading}
                                title={item.title}
                                posterPath={item.poster_path}
                                releaseDate={item.release_date}
                                overview={item.overview}
                                voteAverage={item.vote_average}
                            />
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    );
};
