import React , {  useState } from 'react';
import '../../styles/components/video.css';
import ReactPlayer from 'react-player';
import { addToHistory , removeFromHistory } from '../../services/historyService';
import { useUser } from '../../contexts/userContext';
import { toastError, toastSuccess } from '../../services/toastService';
import { addToLikes, removeFromLikes } from '../../services/likeService';
import { Link } from 'react-router-dom';
import { updateIfObjectinArray } from '../../services/videoService';
import { addToWatchLater, removeFromWatchLater } from '../../services/watchlaterService';
import { useData } from '../../contexts/dataContext';
import { addPlaylist, addVideoToPlaylist } from '../../services/playlistService';



export const Video = (props) => {

    const { userState , userDispatcher } = useUser();

    const { selectedVideo , setSelectedVideo } = useData();
    
    const [playlistModal , setPlaylistModal] = useState('playlist-modal')

    const togglePlaylistModal = (videoDetails) => {
         if( selectedVideo === 'none' ) {
         setSelectedVideo(videoDetails);
         playlistModal === 'playlist-modal' ? setPlaylistModal('playlist-modal-appear') : setPlaylistModal('playlist-modal') ;
    }};

    const closePlaylistModal = () => {
         setSelectedVideo('none');
         setPlaylistModal('playlist-modal')
    }

    const [credentials,setCredentials] = useState({ title : '', description : '' });
    
    const handleCredentialsChange = (e) => {
        const { name,value } = e.target;
        const currentCredentials = { ...credentials , [name]:value }
        setCredentials(currentCredentials);
    } 

    const addInHistory = async (myToken, videoDetails) => {
        if ( userState.foundUser ) {
        const response = await addToHistory(myToken, videoDetails);
        if(response.actionSuccess) {
            userDispatcher({ 
                type: 'ADDTOHISTORY' , 
                payload : { ...userState.foundUser , history : [ { ...videoDetails } , ...userState.foundUser.history ] }   
            });
        }
    }};

    const removeInHistory = async (myToken , videoDetails) => {
        const response = await removeFromHistory(myToken , videoDetails._id);
        if(response.actionSuccess) {
            toastSuccess('Video removed from history')
            userDispatcher({ 
                type: 'REMOVEFROMHISTORY' , 
                payload : { ...userState.foundUser , 
                    history : [...userState.foundUser.history].filter( video => video._id !== videoDetails._id ) 
                }   
            });
    
        } else {
            toastError('Oops! Something went wrong')
        }
    };

    const ATL = async (myToken , videoDetails) => {
        const likedVideo = { ...videoDetails , inLikes: true };
        const response = await addToLikes(myToken , videoDetails);
        if (response.actionSuccess) {
            toastSuccess('Video added to Likes');
            let newHistory = updateIfObjectinArray(userState.foundUser.history, likedVideo, 'inLikes' , true);
            let newWatchLater = updateIfObjectinArray(userState.foundUser.watchlater , likedVideo, 'inLikes' , true);
            userDispatcher({ 
                type: 'ADDTOLIKES' , 
                payload : { ...userState.foundUser , 
                    history : newHistory , watchlater : newWatchLater , 
                    likes : [ ...userState.foundUser.likes , { ...likedVideo} ] 
                }   
            });
        } else {
            toastError('Something Went Wrong')
        }
    }

    const ATWL = async (myToken , videoDetails) => {
        const watchlaterVideo = { ...videoDetails , inWatchlater: true };
        const response = await addToWatchLater(myToken , videoDetails);
        if (response.actionSuccess) {
            toastSuccess('Video added to Watchlater');
            let newHistory = updateIfObjectinArray(userState.foundUser.history, watchlaterVideo, 'inWatchlater' , true);
            let newLikes = updateIfObjectinArray(userState.foundUser.likes, watchlaterVideo, 'inWatchlater' , true);
            userDispatcher({ 
                type: 'ADDTOWATCHLATER' , 
                payload : { ...userState.foundUser , 
                    history : newHistory , likes : newLikes , 
                    watchlater : [ ...userState.foundUser.watchlater , { ...watchlaterVideo} ] 
                }   
            });
        } else {
            toastError('Something Went Wrong')
        }
    }

    const RFL = async (myToken, videoDetails) => {
        const response = await removeFromLikes(myToken, videoDetails._id);
        if (response.actionSuccess) {
            toastSuccess('Video removed from Likes');
            let newHistory = updateIfObjectinArray(userState.foundUser.history, videoDetails, 'inLikes' , false);
            let newWatchLater = updateIfObjectinArray(userState.foundUser.watchlater , videoDetails, 'inLikes' , false);
            userDispatcher({ 
                type: 'REMOVEFROMLIKES' , 
                payload : { ...userState.foundUser , 
                    history : newHistory , watchlater : newWatchLater , 
                    likes : [...userState.foundUser.likes].filter(video => video._id !== videoDetails._id) 
                }   
            });
        } else {
            toastError('Something Went Wrong')
        }
    }

    const RFWL = async (myToken, videoDetails) => {
        const response = await removeFromWatchLater(myToken, videoDetails._id);
        if (response.actionSuccess) {
            toastSuccess('Video removed from Watchlater');
            let newHistory = updateIfObjectinArray(userState.foundUser.history, videoDetails, 'inWatchlater' , false);
            let newLikes = updateIfObjectinArray(userState.foundUser.likes , videoDetails, 'inWatchlater' , false);
            userDispatcher({ 
                type: 'REMOVEFROMWATCHLATER' , 
                payload : { ...userState.foundUser , 
                    history : newHistory , likes : newLikes , 
                    watchlater : [...userState.foundUser.watchlater].filter(video => video._id !== videoDetails._id) 
                }   
            });
        } else {
            toastError('Something Went Wrong')
        }
    }

    const ANP = async (myToken) => {
        const response = await addPlaylist(myToken, credentials);
        if (response.actionSuccess) {
            toastSuccess(`Playlist ${credentials.title} added`);
            userDispatcher({ 
                type: 'ADDPLAYLIST' , 
                payload : { ...userState.foundUser , playlists : response.actionResponse.data.playlists 
                }   
            });
        } else {
            toastError('Oops ! , Something went wrong')
        }
    }

    const AVTP = async (myToken , playlist , videoDetails) => {
        const response = await addVideoToPlaylist(myToken, playlist._id, videoDetails);
        if(response.actionSuccess) {
            toastSuccess(`Video added to PLaylist ${playlist.title}`);
            let updatedPlaylist = response.actionResponse.data.playlist;
            userDispatcher({ 
                type: 'ADDVIDEOTOPLAYLIST' , 
                payload : { ...userState.foundUser , playlists : [...userState.foundUser.playlists].map( playlist => playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist ) 
                }   
            });
            closePlaylistModal();
        } else {
            if(response.actionResponse.response.status === 409 ) {
                toastError(response.actionResponse.response.data.errors[0]); 
               } else {
                toastError('Oops, an error has occured!');
            }
        }
    }



    return (
        <div className="vid-wrapper txt-over pos-rel">
            <div className={playlistModal} >
                <div className='pos-rel'>
                <span className='material-icons txt-bee bdr-rad-f rot-c-45' onClick={() => closePlaylistModal()} >
                    add_circle
                </span>
                </div>
                {  userState.foundUser && <div className='d-flex fd-col pb-xs pl-xs gap-1'>
                    <div className='txt-smoke'> Playlists </div>
                    { userState.foundUser.playlists.map( playlist => 
                    <button className='btn-bee w-75 bdr-rad-f'
                     onClick={() => AVTP(userState.encodedToken , playlist , props.videoDetails)}> 
                        <span className='f-w-600 d-flex ai-c jc-sb' >    { playlist.title }
                        <span className='material-icons' >add_circle</span>
                        </span> 
                    </button>) }
                </div> }
                <div className='d-flex fd-col gap-1 px-xs'>
                    <div className='txt-smoke'>Add New Playlists </div>
                    <div className='d-flex fd-row jc-sb'>
                        <input className='bdr-rad-sm w-75' onChange={(e) => handleCredentialsChange(e)}
                        value={ credentials.title } name='title'
                        placeholder='title' />
                        <button className='btn-bee bdr-rad-f' onClick={ () => ANP(userState.encodedToken) }
                        ><span className='material-icons'>add</span></button>
                    </div>
                    <div>
                        <textarea onChange={(e) => handleCredentialsChange(e)} name='description'
                        value={credentials.description} className='w-75' placeholder='description'></textarea>
                    </div>
                </div>
             
            </div>
            { userState.foundUser ?   
                (<div className='pos-abs d-flex ai-c jc-c top-rgt-5' >
                    { props.videoDetails.inWatchlater ? 
                    (<span onClick={() => RFWL( userState.encodedToken , props.videoDetails )}
                        className='material-icons txt-metal bg-smoke bdr-rad-f'>watch_later</span>):
                    (<span onClick={() => ATWL( userState.encodedToken , props.videoDetails )}
                        className='material-icons txt-smoke bg-over bdr-rad-f'>watch_later</span>)}
                </div>) :
                (<Link to='/login'>
                        <div className='pos-abs d-flex ai-c jc-c top-rgt-5' >
                            <span className='material-icons txt-smoke bg-over bdr-rad-f'>watch_later</span>
                        </div>
                </Link>)
            }

            { userState.foundUser && props.fromHistory && 
            <div onClick={() => removeInHistory( userState.encodedToken , props.videoDetails )}
                className='pos-abs d-flex ai-c jc-c top-lft-5 bg-over bdr-rad-f'>
                <span className='material-icons txt-smoke'>remove_circle</span>
            </div>
            }
            
            <div className='vid-thumbnail'>
                <ReactPlayer height={'100%'} width={'100%'} url={props.videoDetails.videoPath}
                        controls playing={false} onPlay={() => addInHistory( userState.encodedToken, props.videoDetails)}/>
            </div>
                    
            <div className='d-flex jc-sb px-xs'>
                <div> 
                    <p className='f-w-700' >{ props.videoDetails.title }</p>
                    <p className='f-w-400 video-card-txt'>{ props.videoDetails.channelName }</p>
                </div>
                <div>
                    { userState.foundUser ?   
                    (<div>
                        { props.videoDetails.inLikes ? (<span onClick={() => RFL( userState.encodedToken , props.videoDetails )}
                        className='material-icons txt-metal'>thumb_up</span>):
                                                       (<span onClick={() => ATL( userState.encodedToken , props.videoDetails )}
                                                       className='material-icons txt-over'>thumb_up</span>)}
                    </div>) :
                    (<Link to='/login'>
                        <div>
                            <span className='material-icons txt-over'>thumb_up</span>
                        </div>
                    </Link>)
                    }
                    { userState.foundUser ? 
                    (<div onClick={() => togglePlaylistModal(props.videoDetails)}>
                        <span className='material-icons'>playlist_add</span>
                    </div>) :
                    (<Link to='/login'>
                    <div>
                        <span className='material-icons'>playlist_add</span>
                    </div>
                    </Link>)
                    }
                </div>  
            </div>
        </div>
    );
};
