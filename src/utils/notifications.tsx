import {notification} from 'antd';

export const errorNotification = (
    error: Error,
    message: string,
    duration?: number,
) => {
    notification.error({
        message,
        description: error.message,
        duration: duration || 4.5,
    });
};

export const successNotification = (
    description: string,
    message?: string,
    duration?: number,
) => {
    notification.success({
        description,
        message: message || 'Success',
        duration: duration || 4.5,
    });
};
