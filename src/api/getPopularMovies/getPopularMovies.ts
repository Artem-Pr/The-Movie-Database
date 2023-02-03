import {errorNotification} from 'src/utils/notifications';

import {RequestsUrlList} from '../RequestsUrlList';
import {axiosInstance} from '../config';

import type {MoviesListRequest} from './types';

export const getPopularMovies = async (page: number) => {
    try {
        const response = await axiosInstance.get<MoviesListRequest>(RequestsUrlList.POPULAR_MOVIES, {
            params: {page},
        });
        return response.data;
    } catch (error) {
        console.error(error);
        errorNotification(new Error((error as Error).message), 'Error loading movies');
        return undefined;
    }
};
