import React from 'react';
import '../../styles/components/video.css';
import ReactPlayer from 'react-player';
import { addToHistory , removeFromHistory } from '../../services/historyService';
import { useUser } from '../../contexts/userContext';
import { toastError, toastSuccess } from '../../services/toastService';

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

    const RFH = async (myToken , videoDetails) => {
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

    return (
        <div className="vid-wrapper txt-over pos-rel">
            <div className='pos-abs d-flex ai-c jc-c top-rgt-5 bg-over bdr-rad-f'>
                <span className='material-icons txt-smoke'>watch_later</span>
            </div>
            { userState.foundUser && props.fromHistory && 
            <div onClick={() => RFH( userState.encodedToken , props.videoDetails )}
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
                    <div>
                        <span className='material-icons'>thumb_up</span>
                    </div>
                    <div>
                        <span className='material-icons'>playlist_add</span>
                    </div>
                </div>  
            </div>
        </div>
    );
};
