import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
    List,
    Typography,
} from 'antd';
import cn from 'classnames';

import {fetchPopularMovies} from 'src/redux/reducers/moviesReducer/thunks';
import {getMoviesList, getSearchString} from 'src/redux/selectors/moviesSelectors';
import {useAppDispatch} from 'src/redux/store';

import {MoviesListItem} from './MoviesListItem';

import styles from './MainPage.module.scss';

const {Title} = Typography;

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const searchString = useSelector(getSearchString);
    const {moviesList} = useSelector(getMoviesList);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dispatchMovies = async () => {
            setLoading(true);
            await dispatch(fetchPopularMovies());
            setLoading(false);
        };

        void dispatchMovies();
    }, [dispatch]);

    return (
        <div className={cn(styles.wrapper, 'd-flex')}>
            <div className={cn(styles.content, 'mw-auto')}>
                {!searchString && (
                    <Title
                        level={2}
                        className="text-center"
                    >
                        Popular movies
                    </Title>
                )}
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
            </div>
        </div>
    );
};
