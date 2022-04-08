import React from 'react';
import { useUser } from '../../contexts/userContext';
import { removePlaylist, toastError, toastSuccess } from '../../services';
import { Video } from '../components';

export const Playlists = () => {

    const { userState, userDispatcher } = useUser();

    const deletePlaylist = async (myToken, playlistDetails) => {
        const response = await removePlaylist(myToken, playlistDetails._id);
        if (response.actionSuccess) {
            toastSuccess(`Playlist ${playlistDetails.title} was deleted`);
            userDispatcher({
                type: 'REMOVE_PLAY_LIST',
                payload: {
                    ...userState.foundUser, playlists: response.actionResponse.data.playlists
                }
            });
        } else {
            toastError('Oops ! , Something went wrong')
        }
    }

    return (
        <main className='main'>
            {userState.foundUser && userState.foundUser.playlists.length > 0 ?
                (<div className='videos-wrapper px-xs py-xs mx-auto pos-rel'>
                    {userState.foundUser.playlists.map(playlist =>
                        <div className='d-flex pt-sm pb-xs fd-col pos-rel'>
                            <div onClick={() => deletePlaylist(userState.encodedToken, playlist)}
                                className='txt-smoke bg-metal pos-abs top-rgt-0 bdr-rad-f d-flex ai-c jc-c' >
                                <span className='material-icons' >clear</span>
                            </div>
                            <div className='d-flex fd-col' >
                                <div className='f-w-600 f-15x txt-over'>{playlist.title}</div>
                                <div className='f-w-400 txt-over' >{playlist.description}</div>
                            </div>
                            <div>
                                <hr />
                            </div>
                            <div className='d-flex fw-wrap gap-1' >
                                {playlist.videos.map(video => <Video fromHistory={false} fromPlaylists={playlist} key={video._id} videoDetails={video} />)}
                            </div>
                        </div>)}
                </div>) : (<p className='f-2x f-w-500 px-sm py-sm ta-c'> No Playlists Added</p>)}
        </main>
    );
};
