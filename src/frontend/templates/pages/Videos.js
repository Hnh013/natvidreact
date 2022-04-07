import React from 'react';
import { useData } from '../../contexts/dataContext';
import { Video } from '../components';

export const Videos = () => {

    const { videos } = useData();

    return (
    <main className='main'>
        <div className='videos-wrapper px-xs py-sm d-flex fw-wrap ai-c jc-c gap-1 mx-auto'>
            { videos.map( (video,index) => <Video key={index} videoDetails={video} /> ) }
        </div>
    </main>
    );
};