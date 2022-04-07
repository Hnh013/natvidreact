import React from 'react';
import '../../styles/components/video.css';

export const Video = (props) => {

    return (
        <div className="vid-wrapper txt-over pos-rel">
            <div className='pos-abs d-flex ai-c jc-c top-rgt-5 bg-over bdr-rad-f'>
                <span className='material-icons txt-smoke'>watch_later</span>
            </div>
            
            <iframe className='vid-thumbnail'
                src={props.videoDetails.videoPath}
                frameBorder="0"
                allowFullScreen={true}
                title="video"
                style={{ objectFit: "cover" }}               
            />
                    
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
