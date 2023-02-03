import React from 'react';

import {Divider, Skeleton} from 'antd';

const listItemSkeleton = (
    <div className="d-flex gap-20 align-center">
        <Skeleton active />
        <Skeleton.Image active />
    </div>
);

export const getSkeleton = (numberOfRows: number) => (
    numberOfRows === 0
        ? undefined
        : Array
            .from({length: numberOfRows})
            .map((__, idx) => (
                <div key={idx}>
                    {idx > 0 && <Divider />}
                    {listItemSkeleton}
                </div>
            ))
);
