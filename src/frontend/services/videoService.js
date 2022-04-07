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


export { getAllVideos };