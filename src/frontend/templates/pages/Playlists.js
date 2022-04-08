import React from 'react';
import { useUser } from '../../contexts/userContext';
import { Video } from '../components';

export const Playlists = () => {

    const { userState } = useUser();

    return (
    <main className='main'>
        { userState.foundUser && userState.foundUser.playlists.length > 0 ?
        (<div className='videos-wrapper px-xs py-xs mx-auto'>
            { userState.foundUser.playlists.map( playlist =>  
            <div className='d-flex py-xs fd-col'>
                <div className='d-flex fd-col' >
                    <div className='f-w-600 f-15x txt-over'>{ playlist.title }</div>
                    <div className='f-w-400 txt-over' >{ playlist.description }</div>
                </div>
                <div>
                    <hr/>
                </div>
                <div className='d-flex fw-wrap gap-1' >
                   { playlist.videos.map( video => <Video fromHistory={false} key={video._id} videoDetails={video} /> ) } 
                </div>
            </div>)}
        </div>) : ( <p className='f-2x f-w-500 px-sm py-sm ta-c'> No Playlists Added</p> )}
    </main>
    );
};
