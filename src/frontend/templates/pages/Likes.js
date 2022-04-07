import React from 'react';
import { useUser } from '../../contexts/userContext';
import { Video } from '../components';

export const Likes = () => {

  const { userState } = useUser();

    return (
    <main className='main'>
        { userState.foundUser && userState.foundUser.likes.length > 0 ? (<>
        <div className='videos-wrapper px-xs py-sm d-flex fw-wrap ai-c jc-c gap-1 mx-auto'>
            { [...userState.foundUser.likes].map( video => <Video fromHistory={false}  key={video._id} videoDetails={video} /> ) }
        </div>
        </>) : (<p className='f-2x f-w-500 px-sm py-sm ta-c'> No Liked Videos</p>)}
    </main>
    );
};