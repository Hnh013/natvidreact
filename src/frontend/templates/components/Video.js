import React from 'react';
import '../../styles/components/video.css';
import ReactPlayer from 'react-player';
import { addToHistory , removeFromHistory } from '../../services/historyService';
import { useUser } from '../../contexts/userContext';
import { toastError, toastSuccess } from '../../services/toastService';
import { addToLikes, removeFromLikes } from '../../services/likeService';
import { Link } from 'react-router-dom';
import { updateIfObjectinArray } from '../../services/videoService';
import { addToWatchLater, removeFromWatchLater } from '../../services/watchlaterService';
export const Video = (props) => {

    const { userState , userDispatcher } = useUser();

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

    return (
        <div className="vid-wrapper txt-over pos-rel">
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
                    <div>
                        <span className='material-icons'>playlist_add</span>
                    </div>
                </div>  
            </div>
        </div>
    );
};
