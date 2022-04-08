import React from 'react';
import { useUser } from '../../contexts/userContext';
import { removePlaylist } from '../../services/playlistService';
import { toastError, toastSuccess } from '../../services/toastService';
import { Video } from '../components';

export const Playlists = () => {

    const { userState , userDispatcher } = useUser();

    const RP = async (myToken, playlistDetails) => {
        const response = await removePlaylist(myToken, playlistDetails._id);
        if (response.actionSuccess) {
            toastSuccess(`Playlist ${playlistDetails.title} removed`);
            userDispatcher({ 
                type: 'REMOVEPLAYLIST' , 
                payload : { ...userState.foundUser , playlists : response.actionResponse.data.playlists 
                }   
            });
        } else {
            toastError('Oops ! , Something went wrong')
        }
    }

    return (
    <main className='main'>
        { userState.foundUser && userState.foundUser.playlists.length > 0 ?
        (<div className='videos-wrapper px-xs py-xs mx-auto pos-rel'>
            { userState.foundUser.playlists.map( playlist =>  
            <div className='d-flex pt-sm pb-xs fd-col pos-rel'>
                <div onClick={() => RP( userState.encodedToken , playlist )} 
                    className='pos-abs top-rgt bg-over bdr-rad-f txt-metal' >
                    <span className='material-icons rot-c-45' >add_circle</span>
                </div>
                <div className='d-flex fd-col' >
                    <div className='f-w-600 f-15x txt-over'>{ playlist.title }</div>
                    <div className='f-w-400 txt-over' >{ playlist.description }</div>
                </div>
                <div>
                    <hr/>
                </div>
                <div className='d-flex fw-wrap gap-1' >
                   { playlist.videos.map( video => <Video fromHistory={false} fromPlaylists={playlist} key={video._id} videoDetails={video} /> ) } 
                </div>
            </div>)}
        </div>) : ( <p className='f-2x f-w-500 px-sm py-sm ta-c'> No Playlists Added</p> )}
    </main>
    );
};
