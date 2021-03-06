import axios from 'axios';

export const getWatchLater = async (myToken) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.get("/api/user/watchlater", { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
}

export const addToWatchLater = async (myToken , videoDetails) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.post("/api/user/watchlater", { video : videoDetails } , { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
}

export const removeFromWatchLater = async (myToken , videoId) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.delete(`/api/user/watchlater/${videoId}`, { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
}
