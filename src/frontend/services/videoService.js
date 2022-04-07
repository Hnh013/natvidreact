import axios from 'axios';

const getAllVideos = async () => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.get("/api/videos");
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
}

const videoInArrayChecker = ( userObjectArray , videosArray , objectArrayName ) => {
    let activationFlag = false;
    let customArray = [...videosArray];
    if( userObjectArray !== [] ) {
        for( let i = 0; i < userObjectArray.length; i++ ) {
            for( let j = 0 ; j < customArray.length; j++ ) {
                if ( userObjectArray[i]._id === customArray[j]._id ) { 
                    if( objectArrayName === 'like') {
                        customArray[j].inLikes = true;
                    } 
                    if( objectArrayName === 'watchlater' ) {
                        customArray[j].inWatchlater = true;
                    }
                    activationFlag = true;
                }
            }
        }
    }
    return activationFlag ? customArray : videosArray;
}

const findObjInArray = (targetArray, videoDetails) => {
    return Boolean(targetArray.find( x => x._id === videoDetails._id));
}

const updateAttributeInArray = (targetArray , attributeName , videoDetails , flagStatus ) => {
    return [...targetArray].map(x => x._id === videoDetails._id ? { ...x , [attributeName]: flagStatus } : x );
}

const updateIfObjectinArray = (targetArray, videoDetails, attributeName, flagStatus) => {
    let activationFlag = false;
    let newArray = [];
    if(findObjInArray(targetArray,videoDetails)) {
        activationFlag = true;
        newArray = updateAttributeInArray(targetArray , attributeName , videoDetails, flagStatus);
    }
    return activationFlag ? newArray : targetArray;
}


export { getAllVideos , videoInArrayChecker , updateIfObjectinArray };