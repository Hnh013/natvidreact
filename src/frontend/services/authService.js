import axios from 'axios';

export const loginAction = async (credentials) => {
    let actionSuccess = false;
    let actionResponse;
    try {
      actionResponse = await axios.post('/api/auth/login/', credentials);
      actionSuccess = true;
    } catch (error) {
      actionResponse = error;
      actionSuccess = false;
    }
    return {actionResponse , actionSuccess};

}

export const signupAction = async (userDetails) => {
  let actionSuccess = false;
  let actionResponse;
  try {
    actionResponse = await axios.post('/api/auth/signup/', userDetails);
    actionSuccess = true;
  } catch (error) {
    actionResponse = error;
    actionSuccess = false;
  }
  return {actionResponse , actionSuccess};
}
