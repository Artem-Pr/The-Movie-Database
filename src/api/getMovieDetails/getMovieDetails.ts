import {errorNotification} from 'src/utils/notifications';

import {RequestsUrlList} from '../RequestsUrlList';
import {axiosInstance} from '../config';

import type {MovieDetailsRequest} from './types';

export const getMovieDetails = async (id: string) => {
    try {
        const response = await axiosInstance.get<MovieDetailsRequest>(`${RequestsUrlList.MOVIE_DETAILS}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        errorNotification(new Error((error as Error).message), 'Error loading movie details');
        return undefined;
    }
};
