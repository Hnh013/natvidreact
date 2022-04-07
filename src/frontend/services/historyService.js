import axios from 'axios';

const getHistory = async (myToken) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.get("/api/user/history", { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };;
}

const addToHistory = async (myToken , videoDetails) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.post("/api/user/history", { video : videoDetails } , { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    } 
    return { actionResponse , actionSuccess };;
}

const removeFromHistory = async (myToken , videoId) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.delete(`/api/user/history/${videoId}`, { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
}

const clearHistory = async (myToken) => {
  let actionResponse;
  let actionSuccess = false;
    try {
      actionResponse = await axios.delete(`/api/user/history/all`, { headers: { authorization: myToken }});
      actionSuccess = true;
    } catch(error) {
      actionResponse = error;
      actionSuccess = false;
    }
    return { actionResponse , actionSuccess };;
}

export { getHistory , addToHistory , removeFromHistory , clearHistory };