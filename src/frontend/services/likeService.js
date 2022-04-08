import axios from 'axios';

export const getLikes = async (myToken) => {
          let actionResponse = {};
          let actionSuccess = false;
          try {
              const response = await axios.get("/api/user/likes", { headers: { authorization: myToken }});
              actionResponse = response;
              actionSuccess = true;
          } catch(error) {
              actionSuccess = false;
          }
      return { actionResponse , actionSuccess };
}

export const addToLikes = async (myToken , videoDetails) => {
  let actionResponse = {};
  let actionSuccess = false;
  try {
      const response = await axios.post("/api/user/likes", { video : videoDetails } , { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      actionSuccess = false;
  }
  return { actionResponse , actionSuccess };
}

export const removeFromLikes = async (myToken , videoId) => {
  console.log(videoId);
  let actionResponse = {};
  let actionSuccess = false;
  try {
      const response = await axios.delete(`/api/user/likes/${videoId}`, { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      actionSuccess = false;
  }
  return { actionResponse , actionSuccess };
}
