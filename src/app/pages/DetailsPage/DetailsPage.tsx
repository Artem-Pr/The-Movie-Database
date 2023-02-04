import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {
    Button,
    Descriptions,
    Typography,
} from 'antd';
import cn from 'classnames';

import styles from './DetailsPage.module.scss';

const {
    Title,
    Paragraph,
    Text,
    Link,
} = Typography;

export const DetailsPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        id && console.info(id);
    }, [id]);

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
                    alt="titleImage"
                    src="https://image.tmdb.org/t/p/w300/dm06L9pxDOL9jNSK4Cb6y139rrG.jpg"
                />

                <div className={styles.titleProp}>
                    <Title
                        className="mt-0"
                        level={2}
                    >
                        While vacationing at a remote cabin
                    </Title>

                    <Descriptions
                        column={1}
                        labelStyle={{fontWeight: 'bold'}}
                    >
                        <Descriptions.Item label="Genres">
                            <Text type="secondary">horror, mystery, thriller</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Vote average">horror, mystery, thriller</Descriptions.Item>
                        <Descriptions.Item label="Vote count">horror, mystery, thriller</Descriptions.Item>
                        <Descriptions.Item label="Release date">horror, mystery, thriller</Descriptions.Item>
                        <Descriptions.Item label="Runtime">horror, mystery, thriller</Descriptions.Item>
                        <Descriptions.Item label="Budget">horror, mystery, thriller</Descriptions.Item>
                    </Descriptions>
                </div>

                <div className={styles.description}>
                    <Title level={3}>
                        Overview
                    </Title>
                    <Paragraph>
                        While vacationing at a remote cabin,
                        a young girl and her two fathers are taken hostage by four
                        armed strangers who demand that the family make an unthinkable choice
                        to avert the apocalypse. With limited access to the outside world,
                        the family must decide what they believe before all is lost.
                    </Paragraph>
                    <div className="d-flex gap-10">
                        <Text>Homepage:</Text>
                        <Link
                            href="https://www.knockatthecabin.com/"
                            target="_blank"
                        >
                            https://www.knockatthecabin.com/
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
