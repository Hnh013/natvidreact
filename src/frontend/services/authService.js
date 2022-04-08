import axios from 'axios';

const loginAction = async (credentials) => {
    let actionSuccess = false;
    let actionResponse;
    try {
      actionResponse = await axios.post('/api/auth/login/', credentials);
      actionSuccess = true;
      console.log(actionResponse);
    } catch (error) {
      actionResponse = error;
      actionSuccess = false;
    }
    return {actionResponse , actionSuccess};

}

const signupAction = async (userDetails) => {
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

export { loginAction , signupAction };