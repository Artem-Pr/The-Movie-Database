import {errorNotification} from 'src/utils/notifications';

import {RequestsUrlList} from '../RequestsUrlList';
import {axiosInstance} from '../config';

import type {MoviesListRequest} from './types';

export const getMovies = async (page: number, query?: string) => {
    const requestURL = query ? RequestsUrlList.SEARCH_MOVIES : RequestsUrlList.POPULAR_MOVIES;

    try {
        const response = await axiosInstance.get<MoviesListRequest>(requestURL, {
            params: {
                page,
                query: query || undefined,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        errorNotification(new Error((error as Error).message), 'Error loading movies');
        return undefined;
    }
};
