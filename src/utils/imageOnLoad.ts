import type {SyntheticEvent} from 'react';

export const imageOnLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.remove('d-none');
};
