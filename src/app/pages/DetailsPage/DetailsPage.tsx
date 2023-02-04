import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {
    Button,
    Descriptions,
    Skeleton,
    Typography,
} from 'antd';
import cn from 'classnames';

import imgPlaceholder from 'src/assets/images/image-placeholder.svg';
import {fetchMovieDetails} from 'src/redux/reducers/movieDetailsReducer/thunks';
import {getMovieDetails, getMovieProperties} from 'src/redux/selectors/movieDetailsSelectors';
import {useAppDispatch} from 'src/redux/store';
import {imageOnLoad} from 'src/utils/imageOnLoad';

import styles from './DetailsPage.module.scss';

const {
    Title,
    Paragraph,
    Text,
    Link,
} = Typography;

const handleImageOnLoad = (loading: boolean) => (event: SyntheticEvent<HTMLImageElement>) => {
    !loading && imageOnLoad(event);
};

export const DetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        title,
        posterPath,
        overview,
        homepage,
        id,
    } = useSelector(getMovieDetails);
    const movieProperties = useSelector(getMovieProperties);
    const {id: paramId} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sameMovie = id === Number(paramId as string);

        const fetchDetails = async () => {
            setLoading(true);
            !sameMovie && await dispatch(fetchMovieDetails(paramId as string));
            setLoading(false);
        };

        paramId && fetchDetails();
    }, [dispatch, id, paramId]);

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
                    className={cn(styles.image, 'd-none')}
                    alt={title}
                    src={posterPath}
                    onLoad={handleImageOnLoad(loading)}
                />
                <div className={styles.imgPlaceholder}>
                    <img
                        src={imgPlaceholder}
                        alt={title}
                    />
                </div>

                <div className={styles.titleProp}>
                    {loading
                        ? <Skeleton.Input className="m-5" active />
                        : (
                            <Title
                                className="mt-0"
                                level={2}
                            >
                                {title}
                            </Title>
                        )}

                    {loading
                        ? <Skeleton paragraph={{rows: 6}} active />
                        : (
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
                        )}
                </div>

                {loading
                    ? <Skeleton className={styles.description} active />
                    : (
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
                    )}
            </div>
        </div>
    );
};
