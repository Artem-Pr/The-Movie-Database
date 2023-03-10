import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {
    Divider,
    List,
    Typography,
} from 'antd';
import cn from 'classnames';

import {RoutePaths} from 'src/globalTypes/RoutePaths';
import {fetchMovies} from 'src/redux/reducers/moviesReducer/thunks';
import {getMoviesList, getSearchString} from 'src/redux/selectors/moviesSelectors';
import {useAppDispatch} from 'src/redux/store';

import {MoviesListItem} from './MoviesListItem';
import {getSkeleton} from './helpers';

import styles from './MainPage.module.scss';

const {Title} = Typography;
const skeletonList = getSkeleton(3);

export const MainPage = () => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchString = useSelector(getSearchString);
    const {moviesList, page, totalPages} = useSelector(getMoviesList);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dispatchMovies = async () => {
            setLoading(true);
            await dispatch(fetchMovies({isFirstPage: true, query: searchString}));
            setLoading(false);
            wrapperRef.current?.scrollIntoView();
        };

        void dispatchMovies();
    }, [dispatch, searchString]);

    const fetchNextPage = useCallback(() => {
        void dispatch(fetchMovies({query: searchString}));
    }, [dispatch, searchString]);

    const onNavigateToDetails = useCallback((movieId: number) => {
        navigate(`${RoutePaths.DETAILS}/${movieId}`);
    }, [navigate]);

    return (
        <div
            id="scrollableDiv"
            className={cn(styles.wrapper, 'd-flex')}
        >
            <div
                ref={wrapperRef}
                className={cn(styles.content, 'mw-auto')}
            >
                <Title
                    level={2}
                    className="text-center"
                >
                    {searchString ? 'Searching results' : 'Popular movies'}
                </Title>

                {loading
                    ? <div className="m-10 p-10">{skeletonList}</div>
                    : (
                        <InfiniteScroll
                            className={cn(styles.infiniteScroll, 'pb-10')}
                            dataLength={moviesList.length}
                            next={fetchNextPage}
                            hasMore={page < totalPages}
                            loader={moviesList.length
                                ? <div className="m-10 p-10">{skeletonList}</div>
                                : undefined}
                            endMessage={moviesList.length
                                ? <Divider className="mh-20 d-flex" plain>It is all, nothing more ????</Divider>
                                : undefined}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={moviesList}
                                renderItem={item => (
                                    <MoviesListItem
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        posterPath={item.poster_path}
                                        releaseDate={item.release_date}
                                        overview={item.overview}
                                        voteAverage={item.vote_average}
                                        onListItemClick={onNavigateToDetails}
                                    />
                                )}
                            />
                        </InfiniteScroll>
                    )}
            </div>
        </div>
    );
};
