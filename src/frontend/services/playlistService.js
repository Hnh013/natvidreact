import axios from 'axios';
   
export const getPlaylist = async (myToken) => {
          let actionResponse = {};
          let actionSuccess = false;
          try {
              actionResponse = await axios.get("/api/user/playlists", { headers: { authorization: myToken }});
              actionSuccess = true;
          } catch(error) {
              actionResponse = error;
              actionSuccess = false;
          }
      return { actionResponse , actionSuccess };
}

export const addPlaylist = async (myToken , playlistDetails) => {
    let playListData = { playlist: playlistDetails };
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.post("/api/user/playlists" , playListData , { headers: { authorization: myToken }} );
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
}

export const removePlaylist = async (myToken , playListId) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.delete(`/api/user/playlists/${playListId}` , { headers: { authorization: myToken }} );
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
}

export const addVideoToPlaylist = async (myToken , playlistId, videoDetails) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.post(`/api/user/playlists/${playlistId}`, { video : videoDetails } , { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse, actionSuccess };
  }
  
export const removeVideoFromPlaylist = async (myToken , playListId, videoId) => {
    let actionResponse;
    let actionSuccess = false;
    try {
        actionResponse = await axios.delete(`/api/user/playlists/${playListId}/${videoId}`, { headers: { authorization: myToken }});
        actionSuccess = true;
    } catch(error) {
        actionResponse = error;
        actionSuccess = false;
    }
    return { actionResponse , actionSuccess };
  }
