import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {
    Button,
    Descriptions,
    Typography,
} from 'antd';
import cn from 'classnames';

import {fetchMovieDetails} from 'src/redux/reducers/movieDetailsReducer/thunks';
import {getMovieDetails, getMovieProperties} from 'src/redux/selectors/movieDetailsSelectors';
import {useAppDispatch} from 'src/redux/store';

import styles from './DetailsPage.module.scss';

const {
    Title,
    Paragraph,
    Text,
    Link,
} = Typography;

export const DetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        title,
        posterPath,
        overview,
        homepage,
    } = useSelector(getMovieDetails);
    const movieProperties = useSelector(getMovieProperties);
    const {id} = useParams();

    useEffect(() => {
        id && dispatch(fetchMovieDetails(id));
    }, [dispatch, id]);

    const handleBackButton = () => {
        navigate(-1);
    };

    return (
        <div className={cn(styles.container, 'd-flex justify-center')}>
            <div className={cn(styles.gridWrapper, 'gap-20 d-grid')}>
                <Button
                    className={cn(styles.buttonBack, 'align-self-center')}
                    type="primary"
                    onClick={handleBackButton}
                >
                    Back
                </Button>

                <img
                    className={styles.image}
                    alt={title}
                    src={posterPath}
                />

                <div className={styles.titleProp}>
                    <Title
                        className="mt-0"
                        level={2}
                    >
                        {title}
                    </Title>

                    <Descriptions
                        column={1}
                        labelStyle={{fontWeight: 'bold'}}
                    >
                        {movieProperties.map(({name, value}) => (
                            <Descriptions.Item
                                key={name}
                                label={name}
                            >
                                <Text type="secondary">{value}</Text>
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </div>

                <div className={styles.description}>
                    <Title level={3}>
                        Overview
                    </Title>
                    <Paragraph>
                        {overview}
                    </Paragraph>
                    <div className="d-flex gap-10">
                        <Text>Homepage:</Text>
                        <Link
                            href={homepage}
                            target="_blank"
                        >
                            {homepage}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
